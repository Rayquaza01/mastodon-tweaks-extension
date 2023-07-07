import browser from "webextension-polyfill";
import { GetOptions } from "./OptionsInterface";
import { GetFollowedTags, GetTrendingTags } from "./MastodonAPI";
import { MessageTypes } from "./BackgroundMessages";

async function refreshTrending() {
    const { instance } = await GetOptions();
    browser.storage.local.set({ cacheTrending: await GetTrendingTags(instance) });
}

async function refreshFollowed() {
    const { instance, accessKey } = await GetOptions();
    browser.storage.local.set({ cacheFollowed: await GetFollowedTags(instance, accessKey) });
}

browser.runtime.onMessage.addListener((message, sender) => {
    console.log("Got message ", message);
    if (message.type === MessageTypes.REFRESH_TRENDING) refreshTrending();
    if (message.type === MessageTypes.REFRESH_FOLLOWED) refreshFollowed();

    if (message.type === MessageTypes.LOAD_SCRIPT) {
        if (sender.tab) browser.tabs.executeScript(sender.tab.id, { file: "mastodon.bundle.js" });
    }
});

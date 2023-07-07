import browser, { manifest } from "webextension-polyfill";
import { GetOptions } from "./OptionsInterface";
import { GetTrendingTags } from "./MastodonAPI";
import { MessageTypes } from "./BackgroundMessages";

async function refreshTrending() {
    console.log("Refreshing...");
    const { instance } = await GetOptions();
    browser.storage.local.set({ cacheTrending: await GetTrendingTags(instance) });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Got message ", message);
    if (message.type === MessageTypes.REFRESH_TRENDING) refreshTrending();

    if (message.type === MessageTypes.LOAD_SCRIPT) {
        if (sender.tab) browser.tabs.executeScript(sender.tab.id, { file: "mastodon.bundle.js" });
    }
});

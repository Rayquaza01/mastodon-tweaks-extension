import browser from "webextension-polyfill";
import { GetOptions } from "./OptionsInterface";
import { GetTrendingTags } from "./MastodonAPI";
import { MessageTypes } from "./BackgroundMessages";

async function refreshTrending() {
    console.log("Refreshing...");
    const { instance } = await GetOptions();
    browser.storage.local.set({ cacheTrending: await GetTrendingTags(instance) });
}

// run the mastodon script only on the instance that the user specified
browser.webNavigation.onCompleted.addListener(async (details) => {
    const { instance } = await GetOptions();

    console.log(details.tabId, details.url, instance);

    if (details.url.includes(instance)) {
        await browser.tabs.executeScript(details.tabId, { file: "browser-polyfill.min.js" });
        await browser.tabs.executeScript(details.tabId, { file: "mastodon.bundle.js" });
    }
});

browser.runtime.onMessage.addListener(message => {
    console.log("Got message ", message);
    if (message.type === MessageTypes.refreshTrending) refreshTrending();
});

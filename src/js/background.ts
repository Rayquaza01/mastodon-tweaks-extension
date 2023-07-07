import browser from "webextension-polyfill";
import { GetOptions } from "./OptionsInterface";
import { GetFollowedTags, GetTrendingTags } from "./MastodonAPI";
import { MessageTypes } from "./BackgroundMessages";

const TRENDING_UPDATE_INTERVAL_ALARM = "trendingUpdateInterval";

async function refreshTrending() {
    const { instance } = await GetOptions();
    browser.storage.local.set({ cacheTrending: await GetTrendingTags(instance) });
}

async function refreshFollowed() {
    const { instance, accessKey } = await GetOptions();
    browser.storage.local.set({ cacheFollowed: await GetFollowedTags(instance, accessKey) });
}

async function createTrendingUpdateAlarm() {
    const { trendingUpdateInterval } = await GetOptions();
    browser.alarms.create(TRENDING_UPDATE_INTERVAL_ALARM, {
        periodInMinutes: trendingUpdateInterval
    });
}

browser.runtime.onMessage.addListener((message, sender) => {
    if (message.type === MessageTypes.REFRESH_TRENDING) refreshTrending();
    if (message.type === MessageTypes.REFRESH_FOLLOWED) refreshFollowed();

    if (message.type === MessageTypes.LOAD_SCRIPT) {
        if (sender.tab) browser.tabs.executeScript(sender.tab.id, { file: "mastodon.bundle.js" });
    }

    if (message.type === MessageTypes.UPDATE_TRENDING_UPDATE_INTERVAL) {
        browser.alarms.clear(TRENDING_UPDATE_INTERVAL_ALARM);
        createTrendingUpdateAlarm();
    }
});

browser.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === TRENDING_UPDATE_INTERVAL_ALARM) {
        refreshTrending();
    }
});

// refresh trending and set alarm on browser startup
refreshTrending();
createTrendingUpdateAlarm();

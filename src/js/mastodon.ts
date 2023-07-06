import { AddAltTextEvent } from "./tweaks/alt-text-popup";
import { ApplyHashtagColors } from "./tweaks/hashtags";
import { GetCaches, GetOptions, Options, defaultOptions } from "./OptionsInterface";

console.log("Mastodon Tweaks");

let options: Options = defaultOptions;

let followedTags: string[] = [];
let trendingTags: string[] = [];

let ready = false;

/**
 * Runs once the configuration is loaded
 */
function start() {
    // if (options.replacePublishWithToot) {}

    feedChangeObserver();
}

/**
 * Mutation observer callback, runs every time the feed updates
 */
function feedChangeObserver(): void {
    if (!ready) return;

    AddAltTextEvent(options.addAltTextPopup);
    ApplyHashtagColors(options, trendingTags, followedTags);
}

/**
 * Mutation observer callback. Runs every time the page updates, until feed is ready.
 * Then, it switches to a mutation observer that only checks feed updates
 */
function waitForFeedObserver() {
    // console.log("Change in page body");

    // main element for feed
    const body = document.querySelector(".columns-area__panels__main");
    // if feed element is found
    if (body !== null) {
        // disconnect this mutation observer
        observer.disconnect();

        // create new mutation observer for feed
        const mainObserver = new MutationObserver(feedChangeObserver);
        mainObserver.observe(body, { childList: true, subtree: true });
    }
}

const observer = new MutationObserver(waitForFeedObserver);
observer.observe(document.body, { childList: true, subtree: true });

async function Setup() {
    const [opts, caches] = await Promise.all([GetOptions(), GetCaches()]);
    options = opts;
    followedTags = caches.cacheFollowed;
    trendingTags = caches.cacheTrending;

    console.log("Mastodon Tweaks - Configuration loaded");
    console.log("Options: ", options);
    console.log("Trending: ", trendingTags);
    console.log("Followed: ", followedTags);

    ready = true;

    start();
}

Setup();


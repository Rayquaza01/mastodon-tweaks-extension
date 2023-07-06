import browser from "webextension-polyfill";

export interface Caches {
    cacheFollowed: string[]
    cacheTrending: string[]
}

export interface Options {
    instance: string
    replacePublishWithToot: boolean
    addAltTextPopup: boolean
    coloredFollowedHashtags: boolean
    followedColor: string
    coloredTrendingHashtags: boolean
    trendingColor: string
    coloredLGBTHashtags: boolean
}

export const defaultOptions: Options = {
    instance: "https://mastodon.social",
    replacePublishWithToot: true,
    addAltTextPopup: true,
    coloredFollowedHashtags: false,
    followedColor: "lightgreen",
    coloredTrendingHashtags: false,
    trendingColor: "violet",
    coloredLGBTHashtags: true
};

export async function GetOptions(): Promise<Options> {
    return {
        ...defaultOptions,
        ...((await browser.storage.local.get("options")).options ?? {})
    };
}

export async function GetCaches(): Promise<Caches> {
    const res = {
        ...{ cacheFollowed: [], cacheTrending: [] },
        ...(await browser.storage.local.get(["cacheFollowed", "cacheTrending"]))
    };

    return res;
}

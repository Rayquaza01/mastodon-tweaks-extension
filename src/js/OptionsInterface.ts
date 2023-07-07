import browser from "webextension-polyfill";

export interface Caches {
    cacheFollowed: string[]
    cacheTrending: string[]
}

export enum HashtagHighlightMode {
    BACKGROUND = "background",
    COLOR = "color"
}

export interface Options {
    instance: string
    accessKey: string
    replacePublishWithToot: boolean
    addAltTextPopup: boolean
    coloredFollowedHashtags: boolean
    followedColor: string
    followedBackground: string
    followedHighlightMode: HashtagHighlightMode
    followedUpdateInterval: number
    coloredTrendingHashtags: boolean
    trendingColor: string
    trendingBackground: string
    trendingHighlightMode: HashtagHighlightMode
    trendingUpdateInterval: number
    coloredLGBTHashtags: boolean
}

export const defaultOptions: Options = {
    instance: "https://mastodon.social",
    accessKey: "",
    replacePublishWithToot: true,
    addAltTextPopup: true,
    coloredFollowedHashtags: false,
    followedColor: "lightgreen",
    followedBackground: "linear-gradient(45deg, #1fda6a, #16ebe9)",
    followedHighlightMode: HashtagHighlightMode.COLOR,
    followedUpdateInterval: 7,
    coloredTrendingHashtags: false,
    trendingColor: "violet",
    trendingBackground: "linear-gradient(45deg, #FF61CE, #7C5CFF)",
    trendingHighlightMode: HashtagHighlightMode.BACKGROUND,
    trendingUpdateInterval: 6,
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

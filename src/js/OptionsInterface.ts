import browser from "webextension-polyfill";

export interface Options {
    instance: string
}

export const defaultOptions: Options = {
    instance: "https://mastodon.social"
};

export async function GetOptions(): Promise<Options> {
    return {
        ...defaultOptions,
        ...((await browser.storage.local.get("options")).options ?? {})
    };
}

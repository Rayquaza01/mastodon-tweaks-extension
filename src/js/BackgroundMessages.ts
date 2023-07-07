import browser from "webextension-polyfill";

export enum MessageTypes {
    refreshTrending,
    refreshFollowing
}

export interface Message {
    type: MessageTypes
}

export function SendMessage(msg: Message) {
    browser.runtime.sendMessage(undefined, msg);
}

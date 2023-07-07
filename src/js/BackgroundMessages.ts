import browser from "webextension-polyfill";

export enum MessageTypes {
    REFRESH_TRENDING,
    REFRESH_FOLLOWED,
    UPDATE_TRENDING_UPDATE_INTERVAL,
    LOAD_SCRIPT
}

export interface Message {
    type: MessageTypes
}

export function SendMessage(msg: Message) {
    browser.runtime.sendMessage(undefined, msg);
}

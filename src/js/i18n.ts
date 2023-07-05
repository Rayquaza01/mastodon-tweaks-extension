import browser from "webextension-polyfill";

export function i18n() {
    const translatableElements = [...document.getElementsByClassName("i18n")] as HTMLElement[];
    translatableElements.forEach(item => {
        const translationId = item.dataset.translationId;
        if (translationId === undefined) return;
        item.innerText = browser.i18n.getMessage(translationId);
    });
}

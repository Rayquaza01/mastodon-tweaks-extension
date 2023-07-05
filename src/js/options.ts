import "../css/options.css";
import browser from "webextension-polyfill"
import { i18n } from "./i18n";
import { GetOptions } from "./OptionsInterface";

const instanceField = document.querySelector("#instance") as HTMLInputElement;

i18n();

async function load() {
    const res = await GetOptions();

    instanceField.value = res.instance;
}

function save() {
    browser.storage.local.set({
        options: {
            instance: instanceField.value
        }
    });
}

document.addEventListener("DOMContentLoaded", load);
document.body.addEventListener("change", save);

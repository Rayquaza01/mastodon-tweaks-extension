import browser from "webextension-polyfill";
import { GetOptions, Options, defaultOptions } from "../OptionsInterface";
import { useState, useEffect } from "react";

export function useWebextensionOptions(): [Options, (value: Partial<Options>) => void] {
    const [options, setOptions] = useState(defaultOptions);

    useEffect(() => {
        GetOptions().then(setOptions);
    }, []);

    useEffect(() => {
        browser.storage.local.set({ options });
    }, [options]);

    function setStorageValue(value: Partial<Options>) {
        setOptions({ ...options, ...value });
    }

    return [options, setStorageValue];
}

export function useWebextensionStorage<T>(key: string, defaultValue: T): T {
    const [val, setVal] = useState(defaultValue);

    useEffect(() => {
        browser.storage.local.get(key).then(res => setVal(res[key] ?? defaultValue));
    });

    browser.storage.local.onChanged.addListener(changes => {
        if (key in changes) {
            setVal(changes[key].newValue);
        }
    });

    return val;
}

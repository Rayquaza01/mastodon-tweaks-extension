import browser from "webextension-polyfill";
import { GetOptions, Options, defaultOptions } from "../OptionsInterface";
import { useState, useEffect } from "react";

/**
 * Wrapper for Options as a hook.
 *
 * First value is the current options state or default if not set
 * Second value lets you update the options partially
 */
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

/**
 * Hook that provides a value from webextension storage as a readonly state variable. Updates state whenever value changes in storage
 * @param key The key from storage to check
 * @param defaultValue The default value to fall back to if key is missing
 */
export function useWebextensionStorage<T>(key: string, defaultValue: T): T {
    const [val, setVal] = useState(defaultValue);

    useEffect(() => {
        browser.storage.local.get(key).then(res => setVal(res[key] ?? defaultValue));
    }, []);

    browser.storage.local.onChanged.addListener(changes => {
        if (key in changes) {
            setVal(changes[key].newValue);
        }
    });

    return val;
}

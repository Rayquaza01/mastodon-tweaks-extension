import browser from "webextension-polyfill";
import { GetOptions, defaultOptions } from "../OptionsInterface";
import React, { useEffect, useState } from "react";

export function Form() {
    const [options, setOptions] = useState(defaultOptions);
    // load options
    useEffect(() => {
        GetOptions().then(res => {
            console.log("Setting opts to ", res);
            setOptions(res);
        });
    }, []);

    // set options
    useEffect(() => {
        browser.storage.local.set({ options });
    }, [options]);

    function UpdateTextOption(name: string, value: string) {
        const opts = { ...options };
        opts[name] = value;
        setOptions(opts);
    }

    return (
        <div>
            <h3>Instance Settings</h3>
            <p>Enter your instance. This is the instance the script will run on.</p>
            <input value={options.instance} onChange={e => UpdateTextOption("instance", e.target.value)} type="url" placeholder="Instance" />
            <p>Enter your access key. This is optional, but is required to get highlighting on followed tags to work.</p>
            <input value={options.accessKey} onChange={e => UpdateTextOption("accessKey", e.target.value)} type="text" placeholder="Access Key" />
        </div>
    );
}

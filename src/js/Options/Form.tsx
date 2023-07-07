import React, { useState } from "react";
import browser from "webextension-polyfill";
import { useWebextensionOptions, useWebextensionStorage } from "./webext-hooks";
import { Select, SelectOptions } from "./Select";
import { SendMessage, MessageTypes } from "../BackgroundMessages";
import { HashtagList } from "./HashtagDisplay";
import { HashtagHighlightMode } from "../OptionsInterface";

const HighlightModeOptions: SelectOptions[] = [
    { label: "Color", value: HashtagHighlightMode.COLOR },
    { label: "Background", value: HashtagHighlightMode.BACKGROUND },
];

const isPopup = browser.extension.getViews({ type: "popup" }).includes(window);

export function Form() {

    const [options, setOptions] = useWebextensionOptions();
    const cacheFollowed = useWebextensionStorage<string[]>("cacheFollowed", []);
    const cacheTrending = useWebextensionStorage<string[]>("cacheTrending", []);

    const [trendingVisible, setTrendingVisible] = useState(false);
    const [followedVisible, setFollowedVisible] = useState(false);

    return (
        <div style={isPopup ? { maxWidth: "400px", width: "400px" } : undefined}>
            Is popup: {isPopup.toString()}<br />
            <a href="/popup.html" target="_blank">Open Page In Tab</a>

            <h3>Instance Settings</h3>
            <label>
                Instance
                <input type="url" value={options.instance} onChange={e => setOptions({ instance: e.currentTarget.value })} placeholder="Instance" />
            </label><br />
            <label>
                Access Key
                <input type="text" value={options.accessKey} onChange={e => setOptions({ accessKey: e.currentTarget.value })} placeholder="Access Key" />
            </label>
            <p>(Access key is only needed for highlight followed hashtags)</p>

            <h3>Alt Text</h3>
            <label>
                <input type="checkbox" checked={options.addAltTextPopup} onChange={e => setOptions({ addAltTextPopup: e.currentTarget.checked })} />
                Add alt text popup (Alt + Click to view)
            </label>

            <h3>Hashtag Highlighting</h3>
            <h4>Trending Hashtags</h4>
            <label>
                <input type="checkbox" checked={options.coloredTrendingHashtags} onChange={e => setOptions({ coloredTrendingHashtags: e.currentTarget.checked })} />
                Highlight currently trending hashtags
            </label><br />
            <label>
                Highlighting mode
                <Select value={options.trendingHighlightMode} options={HighlightModeOptions} onChange={e => setOptions({ trendingHighlightMode: e.currentTarget.value as HashtagHighlightMode })} />
            </label><br />
            <label>
                Highlight color
                <input type="text" value={options.trendingColor} onChange={e => setOptions({ trendingColor: e.currentTarget.value })} />
            </label><br />
            <label>
                Highlight background
                <input type="text" value={options.trendingBackground} onChange={e => setOptions({ trendingBackground: e.currentTarget.value })} />
            </label><br />
            <div>
                Trending Hashtags <button onClick={() => SendMessage({ type: MessageTypes.REFRESH_TRENDING }) }>Refresh</button> <button onClick={() => setTrendingVisible(!trendingVisible)}>{trendingVisible ? "Hide" : "Show"}</button> <br />
                <HashtagList hashtags={cacheTrending} mode={options.trendingHighlightMode} color={options.trendingColor} background={options.trendingBackground} visible={trendingVisible} />
            </div>

            <h4>Followed Hashtags</h4>
            <label>
                <input type="checkbox" checked={options.coloredFollowedHashtags} onChange={e => setOptions({ coloredFollowedHashtags: e.currentTarget.checked })} />
                Highlight followed hashtags (needs access key)<br />
            </label>
            <label>
                Highlighting mode
                <Select value={options.followedHighlightMode} options={HighlightModeOptions} onChange={e => setOptions({ followedHighlightMode: e.currentTarget.value as HashtagHighlightMode })} />
            </label><br />
            <label>
                Highlight color
                <input type="text" value={options.followedColor} onChange={e => setOptions({ followedColor: e.currentTarget.value })} />
            </label><br />
            <label>
                Highlight background
                <input type="text" value={options.followedBackground} onChange={e => setOptions({ followedBackground: e.currentTarget.value })} />
            </label><br />
            <div>
                Trending Hashtags <button onClick={() => SendMessage({ type: MessageTypes.REFRESH_FOLLOWED }) }>Refresh</button> <button onClick={() => setFollowedVisible(!followedVisible)}>{followedVisible ? "Hide" : "Show"}</button> <br />
                <HashtagList hashtags={cacheFollowed} mode={options.followedHighlightMode} color={options.followedColor} background={options.followedColor} visible={followedVisible} />
            </div>

            <h4>LGBT Hashtags</h4>
            <label>
                <input type="checkbox" checked={options.coloredLGBTHashtags} onChange={e => setOptions({ coloredLGBTHashtags: e.currentTarget.checked })} />
                Highlight LGBT related hashtags (may reduce visibility)
            </label>
        </div>
    );
}

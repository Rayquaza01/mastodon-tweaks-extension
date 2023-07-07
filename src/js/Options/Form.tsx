import React, { useState } from "react";
import { useWebextensionOptions, useWebextensionStorage } from "./webext-hooks";
import { Select, SelectOptions } from "./Select";
import { SendMessage, MessageTypes } from "../BackgroundMessages";
import { HashtagList } from "./HashtagDisplay";
import { HashtagHighlightMode } from "../OptionsInterface";

const TrendingModeOptions: SelectOptions[] = [
    { label: "Color", value: HashtagHighlightMode.COLOR },
    { label: "Background", value: HashtagHighlightMode.BACKGROUND },
]

export function Form() {
    const [options, setOptions] = useWebextensionOptions();
    const cacheFollowed = useWebextensionStorage<string[]>("cacheFollowed", []);
    const cacheTrending = useWebextensionStorage<string[]>("cacheTrending", []);

    const [trendingVisible, setTrendingVisible] = useState(false);
    const [followedVisible, setFollowedVisible] = useState(false);

    return (
        <div>
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
                <Select value={options.trendingHighlightMode} options={TrendingModeOptions} onChange={e => setOptions({ trendingHighlightMode: e.currentTarget.value as HashtagHighlightMode })} />
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
                Trending Hashtags <button onClick={() => SendMessage({ type: MessageTypes.refreshTrending }) }>Refresh</button> <button onClick={() => setTrendingVisible(!trendingVisible)}>{trendingVisible ? "Hide" : "Show"}</button> <br />
                <HashtagList hashtags={cacheTrending} mode={options.trendingHighlightMode} color={options.trendingColor} background={options.trendingBackground} visible={trendingVisible} />
            </div>

            <h4>Followed Hashtags</h4>
            <label>
                <input type="checkbox" checked={options.coloredFollowedHashtags} onChange={e => setOptions({ coloredFollowedHashtags: e.currentTarget.checked })} />
                Highlight followed hashtags (needs access key)
            </label>

            <h4>LGBT Hashtags</h4>
            <label>
                <input type="checkbox" checked={options.coloredLGBTHashtags} onChange={e => setOptions({ coloredLGBTHashtags: e.currentTarget.checked })} />
                Highlight LGBT related hashtags (may reduce visibility)
            </label>
        </div>
    );
}

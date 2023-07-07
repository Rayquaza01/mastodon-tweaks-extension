import React from "react";
import { useWebextensionOptions, useWebextensionStorage } from "./webext-hooks";
import { Select } from "./Select";

export function Form() {
    const [options, setOptions] = useWebextensionOptions();
    const cacheFollowed = useWebextensionStorage<string[]>("cacheFollowed", []);
    const cacheTrending = useWebextensionStorage<string[]>("cacheTrending", []);

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
            <div>
                Trending Hashtags<br />
                { cacheTrending.map(item => <span key={item}>#{item}</span> )}
            </div>

            <h4>Followed Hashtags</h4>
            <label>
                <input type="checkbox" checked={options.coloredFollowedHashtags} onChange={e => setOptions({ coloredFollowedHashtags: e.currentTarget.checked })} />
                Highlight followed hashtags (needs access key)
            </label>

            <h4>LGBT Hashtags</h4>
            <label>
                <input type="checkbox" checked={options.coloredLGBTHashtags} onChange={e => setOptions({ coloredTrendingHashtags: e.currentTarget.checked })} />
                Highlight LGBT related hashtags (may reduce visibility)
            </label>
        </div>
    );
}

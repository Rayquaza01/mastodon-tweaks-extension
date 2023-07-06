import { PrideFlagTags, PrideFlagTagsToGradients } from "./pride-gradients";
import { Options } from "../OptionsInterface";

/**
 * Query all tags on the current page and sets the color if matches
 */
export function ApplyHashtagColors(options: Options, trendingTags: string[], followedTags: string[]) {
    const hashtags = [...document.querySelectorAll(".hashtag:not([data-mastodon-tweaks-processed])")] as HTMLElement[];
    //console.log("Found hashtags", hashtags)

    hashtags.forEach((item) => {
        const tag = item.innerText.substring(1).toLowerCase();

        // prevent item from being processed twice
        item.dataset.mastodonTweaksProcessed = "1";

        if (options?.coloredFollowedHashtags) {
            if (followedTags.includes(item.innerText.substring(1).toLowerCase())) {
                item.style.color = options.followedColor;

                // return early to make sure only one color is applyed to each tag
                return;
            }
        }

        if (options?.coloredTrendingHashtags) {
            if (trendingTags.includes(item.innerText.substring(1).toLowerCase())) {
                item.style.color = options.trendingColor;

                return;
            }
        }

        if (options?.coloredLGBTHashtags) {
            if (PrideFlagTags.includes(tag)) {
                item.style.background = (PrideFlagTagsToGradients as Record<string, string>)[tag];
                item.style.backgroundClip = "text";
                // use -webkit-text-fill-color, so that the underline still appears on hover
                item.style.webkitTextFillColor = "transparent";

                return;
            }
        }

    });
}

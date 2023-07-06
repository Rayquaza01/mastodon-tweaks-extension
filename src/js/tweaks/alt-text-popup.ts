/**
 * Queries all images on the current page and, if it has alt text, adds an event listener to display a popup
 */
export function AddAltTextEvent() {
    // get all media galleries on page
    const galleries = [...document.querySelectorAll(".media-gallery:not([data-mastodon-tweaks-processed])")] as HTMLDivElement[];
    galleries.forEach(gallery => {
        // avoid duplicate processing
        gallery.dataset.mastodonTweaksProcessed = "1";

        // grab all images and videos inside of the gallery
        const images = [...gallery.querySelectorAll("img, video")] as (HTMLImageElement | HTMLVideoElement)[];

        images.forEach(item => {
            item.addEventListener("click", e => {
                // only show alert if user held down the alt key
                if ((e as MouseEvent).altKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    // prefer alt text, fall back to title text if not present
                    alert(item.getAttribute("alt") ?? item.getAttribute("title") ?? "No alt text provided.");
                }
            });
        });
    });
}

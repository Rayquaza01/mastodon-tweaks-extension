import { Options } from "../OptionsInterface";

const listIcon = document.querySelector(".column-link[href=\"/lists\"] > i") as HTMLElement;
let listPanel: null | HTMLDivElement = null;
let collapsed = false;

function waitForListObserver(records: MutationRecord[], observer: MutationObserver) {
    console.log("list check update");

    listPanel = document.querySelector(".list-panel");
    if (listPanel !== null) {
        console.log("found list");
        observer.disconnect();

        // toggle collapse, observer only used if collapsing by default
        toggleCollapse();
    }
}

function toggleCollapse() {
    if (listPanel === null) return;

    console.log("Toggling from " + collapsed.toString() + " to " + (!collapsed).toString());
    collapsed = !collapsed;
    listPanel.style.display = collapsed ? "none" : "block";

    if (collapsed) {
        listIcon.classList.remove("fa-chevron-up");
        listIcon.classList.add("fa-chevron-down");
    } else {
        listIcon.classList.add("fa-chevron-up");
        listIcon.classList.remove("fa-chevron-down");
    }
}

export function AddCollapsableList(options: Options) {
    if (!options.collapsableLists) return;

    listIcon.classList.remove("fa-list-ul");
    listIcon.classList.add(options.listsStartCollapsed ? "fa-chevron-down" : "fa-chevron-up");

    if (options.listsStartCollapsed) {
        const observer = new MutationObserver(waitForListObserver);
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

listIcon.addEventListener("click", (e) => {
    console.log("Clicked on icon");
    e.preventDefault();
    e.stopPropagation();
    toggleCollapse();
});

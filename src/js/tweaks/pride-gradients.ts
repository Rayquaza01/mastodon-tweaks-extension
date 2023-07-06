
/** Linear gradients corresponding to pride flag colors. There should be one per supported flag */
export const gradients = {
    trans: "linear-gradient(to right, #55cdfc, #f7a8b8)",
    enby: "linear-gradient(to right, #fff430, #9c59d1, #000)",
    bi: "linear-gradient(to right, #D70071, #9C4E97, #0035AA)",
    pan: "linear-gradient(to right, #FF1B8D, #FFD900, #1BB3FF)",
    ace: "linear-gradient(to right, #000, #a4a4a4, #810081)",
    aro: "linear-gradient(to right, #3aa63f, #a8d47a, #aaa, #000);",
    aroace: "linear-gradient(to right, #E38D00, #EDCE00, #FFFFFF, #62B0DD, #1A3555)",
    lesbian: "linear-gradient(to right, #d62900, #ff9b55, #d461a6, #a50062)",
    gay: "linear-gradient(to right, #26ceaa, #f1efff, #5049cc)",
    lgbt: "linear-gradient(to right, #000000, #794E10, #E60000, #FF8E00, #FFEE00, #028121, #004CFF, #770088)"
};

/**
 * Map for connecting tags to gradients.
 * The key is the hashtag, and the value is the gradient from the gradient table that you want that tag to have
 */
export const PrideFlagTagsToGradients = {
    "transgender": gradients["trans"],
    "trans": gradients["trans"],
    "nonbinary": gradients["enby"],
    "enby": gradients["enby"],
    "bisexual": gradients["bi"],
    "bi": gradients["bi"],
    "pansexual": gradients["pan"],
    "pan": gradients["pan"],
    "asexual": gradients["ace"],
    "ace": gradients["ace"],
    "aromantic": gradients["aro"],
    "aro": gradients["aro"],
    "aroace": gradients["aroace"],
    "lesbian": gradients["lesbian"],
    "gay": gradients["gay"],
    "lgbt": gradients["lgbt"],
    "lgbtq": gradients["lgbt"],
    "lgbtqia": gradients["lgbt"],
    "queer": gradients["lgbt"]
};

/** List of all supported tags. Same as keys from Tag to Gradient table */
export const PrideFlagTags = Object.keys(PrideFlagTagsToGradients);

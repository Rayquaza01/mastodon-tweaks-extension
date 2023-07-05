interface MastodonHashtagRecord {
    name: string
}

interface PaginationLinks {
    next?: string,
    prev?: string
}

function ParsePagination(paginationHeader: string): PaginationLinks {
    const res: PaginationLinks = {};
    // regex for parsing the link header
    const regex = /<(.*)>;\s*rel="(.*)"/;

    const values = paginationHeader.split(",");
    for (const value in values) {
        const result = regex.exec(value);
        if (result === null) continue;

        if (result[2] === "prev" || result[2] === "next") {
            res[result[2]] = res[result[1]];
        }
    }

    return res;
}

/**
 * Gets trending hashtags for the given instance
 * @param instance The root url of the instance
 */
export async function GetTrendingTags(instance: string): Promise<string[]> {
    const req = await fetch(instance + "/api/v1/trends/tags");
    const res = await req.json();
    const trending = res.map((item: MastodonHashtagRecord) => item.name.toLowerCase());

    return trending;
}

/**
 * Gets the hashtags that the user has followed
 * @param instance The root url of the instance
 * @param accessToken The user's OAuth access token
 * @param next The next page to get for pagination
 */
export async function GetFollowedTags(instance: string, accessToken: string, next?: string): Promise<string[]> {
    const req = await fetch(next ?? (instance + "/api/v1/followed_tags"), {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    });

    const linkHeader = req.headers.get("link");
    if (linkHeader !== null) {
        console.log(ParsePagination(linkHeader));
    }

    const res = await req.json();
    // pagination not implemented, won't work if you have more followed tags than fit on page
    const followed = res.map((item: MastodonHashtagRecord) => item.name.toLowerCase());

    return followed;
}

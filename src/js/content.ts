// this script runs on every page. if the current page is the user's chosen instance, it will send a message to load the mastodon script
import { MessageTypes, SendMessage } from "./BackgroundMessages";
import { GetOptions } from "./OptionsInterface";

async function main() {
    const options = await GetOptions();
    if (options.instance === location.origin) SendMessage({ type: MessageTypes.LOAD_SCRIPT });
}

main();

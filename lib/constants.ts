import type { INFO_URL_TYPE, MEDIA_URL_TYPE } from "./types";

export const MEDIA_URL = (ID: string, MID: string): MEDIA_URL_TYPE => {
    return `https://github.com/RahulNavneeth/TK-events-proto/blob/master/events/${ID}/assets/${MID}.jpg`;
}

export const INFO_URL = (ID: string): INFO_URL_TYPE => {
    return `https://github.com/RahulNavneeth/TK-events-proto/blob/master/events/${ID}/info.json`;
}

export const FOLDER_URL = "https://github.com/RahulNavneeth/TK-events-proto/tree/master/events";

import type { INFO_URL_TYPE, MEDIA_URL_TYPE } from "./types";

export const REPO_OWNER = "RahulNavneeth";
export const REPO_NAME = "EVENTS-DATA-24-TEST";

export const MEDIA_URL = (ID: string, MID: number): MEDIA_URL_TYPE => {
    return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/master/events/${ID}/assets/${MID}.png`;
}

export const INFO_URL = (ID: string): INFO_URL_TYPE => {
    return `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/master/events/${ID}/info.json`;
}

export const FOLDER_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/master/events`;
export const FOLDER_INFO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/master/info.json`;

const production = false
export const API_URL = production ? "https://api.cittakshashila.in" : "https://backend-five-beryl.vercel.app";

export const TOKEN_SECRET = 'veryverysecretthingisthis'

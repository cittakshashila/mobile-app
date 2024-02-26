import axios, { Axios, AxiosResponse } from 'axios';
import { REPO_NAME, REPO_OWNER } from '../constants';
import { API_TYPE, EVENT_TYPE } from '../types';
import { PARSE } from './PARSE';

export class G_API {
    private API: Axios;
    public constructor(GITHUB_TOKEN: string) {
        this.API = axios.create({
            baseURL: 'https://api.github.com/repos',
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                contentType: 'application/json',
            }
        })
    }
    public event = async (EVENT_NAME: string, data: EVENT_TYPE, EVENT_MODE: "CREATE" | "UPDATE" = "CREATE"): Promise<API_TYPE> => {
        const API_URL = `/${REPO_OWNER}/${REPO_NAME}/contents/events/${EVENT_NAME}/info.json`;
        const MAIN_URL = `/${REPO_OWNER}/${REPO_NAME}/contents/info.json`;

        let json = JSON.stringify(data, null, 2);

        const r = await fetch(`https://github.com/${REPO_OWNER}/EVENTS-DATA-24/blob/master/info.json`);
        const D = await r.json();

        let mainData = PARSE(D.payload.blob.rawLines)

        if (EVENT_MODE === "CREATE") {
            let newMainData = {}
            newMainData[data.id] = {
                name: data.title,
                type: data.details.type,
            }
            if (data.details.type !== "ONLINE EVENT") newMainData[data.id].date = data.day === "DAY1" ? "29/02/2024": (data.day === "DAY2" ? "01/03/2024": "02/03/2024")
            mainData = { ...mainData, ...newMainData }

            try {
                const createdFileContent = {
                    message: `ADMIN: CREATING EVENT - ${data.title}`,
                    content: Buffer.from(json).toString('base64'),
                };
                const res: AxiosResponse = await this.API.put(API_URL, {
                    ...createdFileContent,
                    committer: {
                        name: 'TK EVENTS: ' + data.title + ' coordinator',
                        email: 'cittakshashila@github.com'
                    },
                }, {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
            } catch (err) {
                return { success: false, message: `Failed to create event` }
            }

            let resp
            try {
                resp = await this.API.get(MAIN_URL);
            } catch (err) {
                return { success: false, message: `Failed to create event` }
            }

            try {
                const createdMainFileContent = {
                    ...resp.data,
                    message: `ADMIN: CREATING EVENT - ${data.title}`,
                    content: Buffer.from(JSON.stringify(mainData, null, 2)).toString('base64'),
                };
                const mainRes: AxiosResponse = await this.API.put(MAIN_URL, {
                    ...createdMainFileContent,
                    committer: {
                        name: 'TK EVENTS: ' + data.title + ' coordinator',
                        email: 'cittakshashila@github.com'
                    },
                }, {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
            } catch (err) {
                return { success: false, message: `Failed to create event` }
            }

            return { success: true, message: `Event ${data.title} created successfully` };
        } else if (EVENT_MODE === "UPDATE") {
            mainData[data.id].name = data.title
            mainData[data.id].type = data.details.type
            mainData[data.id].date = data.day === "DAY1" ? "29/02/2024": (data.day === "DAY2" ? "01/03/2024": "02/03/2024")

            let resp
            try {
                resp = await this.API.get(API_URL);
            } catch (err) {
                return { success: false, message: `Failed to update event` }
            }

            try {
                const updatedFileContent = {
                    ...resp.data,
                    message: `ADMIN: UPDATING EVENT - ${data.title}`,
                    content: Buffer.from(json).toString('base64'),
                };
                const res: AxiosResponse = await this.API.put(API_URL, {
                    ...updatedFileContent,
                    committer: {
                        name: 'TK EVENTS: ' + data.title + ' coordinator',
                        email: 'cittakshashila@github.com'
                    },
                }, {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
            } catch (err) {
                return { success: false, message: `Failed to update event` }
            }

            try {
                resp = await this.API.get(MAIN_URL);
            } catch (err) {
                return { success: false, message: `Failed to update event` }
            }

            try {
                const createdMainFileContent = {
                    ...resp.data,
                    message: `ADMIN: CREATING EVENT - ${data.title}`,
                    content: Buffer.from(JSON.stringify(mainData, null, 2)).toString('base64'),
                };
                const mainRes: AxiosResponse = await this.API.put(MAIN_URL, {
                    ...createdMainFileContent,
                    committer: {
                        name: 'TK EVENTS: ' + data.title + ' coordinator',
                        email: 'cittakshashila@github.com'
                    },
                }, {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
            } catch (err) {
                return { success: false, message: `Failed to create event` }
            }

            return { success: true, message: `Event ${data.title} updated successfully` };

        } else {
            const response = await this.API.get(API_URL)
            if (response.status !== 200) return { success: false, message: `Failed to delete event` }
            
            
            const updatedFileContent = {
                ...response.data,
                message: `ADMIN: DELETING EVENT - ${data.title}`,
            };
            
            const res = await this.API.delete(API_URL, updatedFileContent);
            
            if (res.status !== 200) return { success: false, message: `Failed to delete event: ${res.status}` }

            return { success: true, message: `Event ${data.title} deleted successfully`, data: res.data };
        }
    }
};

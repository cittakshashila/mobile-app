import axios, { Axios, AxiosResponse } from 'axios';
import { REPO_NAME, REPO_OWNER } from '../constants';
import { API_TYPE, EVENT_TYPE } from '../types';
// import { encode } from 'js-base64';

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
        let json = JSON.stringify(data, null, 2);
        console.log(EVENT_MODE);
        if (EVENT_MODE === "CREATE") {
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
            if (res.status !== 200) return { success: false, message: `Failed to create event: ${res.status}` }
            return { success: true, message: `Event ${data.title} created successfully`, data: res.data };
        } else {
            const resp = await this.API.get(API_URL.split('/info.json')[0]);
            console.log(API_URL);
            if (resp.status !== 200) return { success: false, message: `Failed to create event: ${resp.status}` }
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
            if (res.status !== 200) return { success: false, message: `Failed to update event: ${res.status}` }
            return { success: true, message: `Event ${data.title} updated successfully`, data: res.data };
        }

    }
};

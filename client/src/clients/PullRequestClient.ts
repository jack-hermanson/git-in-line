import {PullRequestRequest, PullRequestRecord} from "../models/pullRequest";
import axios from "axios";
import {getAuthHeader} from "../utils";

export default abstract class PullRequestClient {
    static baseUrl = "/api/pull-requests";

    static async create(newPr: PullRequestRequest, token: string) {
        const requestBody: PullRequestRequest = {
            gitHubUrl: newPr.gitHubUrl,
            priority: newPr.priority
        };

        // only add these properties to the request if they are defined / not null
        if (newPr.jiraUrl) {
            requestBody.jiraUrl = newPr.jiraUrl;
        }
        if (newPr.notes) {
            requestBody.notes = newPr.notes;
        }

        const response = await axios.post<PullRequestRecord>(this.baseUrl, requestBody, getAuthHeader(token));
        return response.data;
    }

    static async getAll() {
        const response = await axios.get<PullRequestRecord[]>(this.baseUrl);
        return response.data;
    }
}
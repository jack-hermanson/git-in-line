import {
    NewPrRequest,
    PullRequestRecord,
    EditPrRequest,
} from "../../../shared/src/resource_models/pullRequest";
import axios from "axios";
import { getAuthHeader } from "../utils/utils";

export default abstract class PullRequestClient {
    static baseUrl = "/api/pull-requests";

    static async create(newPr: NewPrRequest, token: string) {
        const requestBody: NewPrRequest = {
            gitHubUrl: newPr.gitHubUrl,
            priority: newPr.priority,
        };

        // only add these properties to the request if they are defined / not null
        if (newPr.jiraUrl) {
            requestBody.jiraUrl = newPr.jiraUrl;
        }
        if (newPr.notes) {
            requestBody.notes = newPr.notes;
        }

        const response = await axios.post<PullRequestRecord>(
            this.baseUrl,
            requestBody,
            getAuthHeader(token)
        );
        return response.data;
    }

    static async getAll() {
        const response = await axios.get<PullRequestRecord[]>(this.baseUrl);
        return response.data;
    }

    static async edit(pullRequest: EditPrRequest, token: string) {
        if (!pullRequest.jiraUrl) {
            delete pullRequest.jiraUrl;
        }
        if (!pullRequest.notes) {
            delete pullRequest.notes;
        }
        const response = await axios.put<PullRequestRecord>(
            `${this.baseUrl}/${pullRequest.id}`,
            pullRequest,
            getAuthHeader(token)
        );
        return response.data;
    }
}

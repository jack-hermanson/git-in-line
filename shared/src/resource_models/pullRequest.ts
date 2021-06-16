import {ResourceModel} from "./_resourceModel";

export interface PullRequestRequest {
    gitHubUrl: string;
    priority: number;
    jiraUrl?: string;
    notes?: string;
}

export interface EditPullRequestRequest extends PullRequestRequest, ResourceModel {
    status: number;
}

export interface PullRequestRecord extends PullRequestRequest, ResourceModel {
    accountId: number;
    status: number;
    created: Date;
    updated: Date;
}

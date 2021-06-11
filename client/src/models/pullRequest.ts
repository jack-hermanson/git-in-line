import {BaseModel} from "./_baseModel";

export interface PullRequestRequest {
    gitHubUrl: string;
    priority: number;
    jiraUrl?: string;
    notes?: string;
}

export interface EditPullRequestRequest extends PullRequestRequest, BaseModel {
    status: number;
}

export interface PullRequestRecord extends PullRequestRequest, BaseModel {
    accountId: number;
    status: number;
    created: Date;
    updated: Date;
}
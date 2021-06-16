import {ResourceModel} from "./_resourceModel";
import {Priority, PrStatus} from "../enums";

export interface NewPrRequest {
    gitHubUrl: string;
    priority: Priority;
    jiraUrl?: string;
    notes?: string;
}

export interface EditPrRequest extends NewPrRequest, ResourceModel {
    status: PrStatus;
}

export interface PullRequestRecord extends NewPrRequest, ResourceModel, EditPrRequest {
    accountId: number;
    created: Date;
    updated: Date;
}

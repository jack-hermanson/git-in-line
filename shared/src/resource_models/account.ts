import {ResourceModel} from "./_resourceModel";

export interface AccountRecord extends ResourceModel {
    username: string;
    token?: string;
}

export interface EditAccountRequest {
    username: string;
}

export interface NewAccountRequest extends EditAccountRequest {
    password: string;
}

export interface LoginRequest extends NewAccountRequest {} // They are the same thing in this case

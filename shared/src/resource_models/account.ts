import {ResourceModel} from "./resourceModel";

export interface AccountRecord extends ResourceModel {
    username: string;
    token?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

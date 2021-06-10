import {BaseModel} from "./_baseModel";

export interface AccountRecord extends BaseModel {
    username: string;
    token?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}
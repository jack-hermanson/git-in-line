import {Request} from "express";
import {Account} from "../models/Account";

export interface AuthRequest<T> extends Request<T> {
    account?: Account;
}

export type DbDialect = "sqlite" | "postgres";

export enum HTTP {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    SERVER_ERROR = 500
}

export enum PrStatus {
    PENDING = 1,
    CHANGES = 2,
    APPROVED = 3
}

export enum Priority {
    HIGH = 1,
    MED = 2,
    LOW = 3
}
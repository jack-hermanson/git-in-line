import { Request } from "express";
import { Account } from "../models/Account";

export interface AuthRequest<T> extends Request<T> {
    account?: Account;
}

export type DbDialect = "sqlite" | "postgres";

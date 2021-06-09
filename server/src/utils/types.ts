import {Request} from "express";

export interface AuthRequest<T> extends Request<T> {

}

export type DbDialect = "sqlite" | "postgres";

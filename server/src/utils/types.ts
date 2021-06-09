import {Request} from "express";
import {TableColumnOptions} from "typeorm/schema-builder/options/TableColumnOptions";

export interface AuthRequest<T> extends Request<T> {

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

import {TableColumnOptions} from "typeorm/schema-builder/options/TableColumnOptions";
import {HTTP} from "./types";
import {Response} from "express";

export const idColumn: TableColumnOptions = {
    name: "id",
    type: "integer",
    isPrimary: true,
    isGenerated: true,
    generationStrategy: "increment"
};

export const sendError = (error: Error, res: Response) => {
    console.error(error);
    res.status(HTTP.SERVER_ERROR).json(error);
};

import express, {Response} from "express";
import {AuthRequest, HTTP} from "../utils/types";
import {NewAccountRequest, newAccountSchema} from "../models/Account";
import {sendError} from "../utils/utils";
import {validateRequest} from "../utils/validation";
import AccountService from "../services/AccountService";

export const router = express.Router();

// get accounts
router.get("/", async (req: AuthRequest<any>, res: Response) => {
    res.json(await AccountService.getAll());
});

// new account
router.post("/", async (req: AuthRequest<NewAccountRequest>, res: Response) => {
    try {
        if (!await validateRequest(newAccountSchema, req, res)) return;

        const requestBody: NewAccountRequest = req.body;
        const newAccount = await AccountService.register(requestBody, res);

        if (!newAccount) return;
        delete newAccount.password;

        res.status(HTTP.CREATED).json(newAccount);
    } catch (error) {
        sendError(error, res);
    }
});

import express, { Response } from "express";
import { AuthRequest } from "../utils/types";
import { HTTP, SocketEvent } from "../../../shared/src/enums";
import { editAccountSchema, newAccountSchema } from "../models/Account";
import {
    EditAccountRequest,
    LoginRequest,
    NewAccountRequest,
} from "../../../shared/src/resource_models/account";
import { sendError } from "../utils/utils";
import { validateRequest } from "../utils/validation";
import AccountService from "../services/AccountService";
import { auth } from "../middleware/auth";
import { Socket } from "socket.io";

export const router = express.Router();

// get accounts
router.get("/", auth, async (req: AuthRequest<any>, res: Response) => {
    res.json(await AccountService.getAll());
});

// new account
router.post("/", async (req: AuthRequest<NewAccountRequest>, res: Response) => {
    try {
        if (!(await validateRequest(newAccountSchema, req, res))) return;

        const requestBody: NewAccountRequest = req.body;
        const newAccount = await AccountService.register(requestBody, res);

        if (!newAccount) return;
        delete newAccount.password;

        const socket: Socket = req.app.get("socketio");
        socket.emit(SocketEvent.MODIFY_ACCOUNTS);

        res.status(HTTP.CREATED).json(newAccount);
    } catch (error) {
        sendError(error, res);
    }
});

// get account
router.get(
    "/:id",
    auth,
    async (req: AuthRequest<{ id: number }>, res: Response) => {
        try {
            const account = await AccountService.getOne(req.params.id, res);
            if (!account) return;
            delete account.password;
            res.json(account);
        } catch (error) {
            sendError(error, res);
        }
    }
);

// log in
router.post("/login", async (req: AuthRequest<LoginRequest>, res: Response) => {
    try {
        if (!(await validateRequest(newAccountSchema, req, res))) return;
        const loginRequest: LoginRequest = req.body;

        const account = await AccountService.logIn(loginRequest, res);
        if (!account) return;

        delete account.password;
        res.json(account);
    } catch (error) {
        sendError(error, res);
    }
});

// log out
router.post("/logout", auth, async (req: AuthRequest<any>, res: Response) => {
    await AccountService.logOut(req.account);
    res.sendStatus(HTTP.OK);
});

// edit account
router.put(
    "/",
    auth,
    async (req: AuthRequest<EditAccountRequest>, res: Response) => {
        try {
            if (!(await validateRequest(editAccountSchema, req, res))) {
                return;
            }
            const requestBody: EditAccountRequest = req.body;
            requestBody.username = requestBody.username.toLowerCase();

            const editedAccount = await AccountService.edit(
                req.account,
                requestBody,
                res
            );

            if (!editedAccount) {
                return;
            }

            const socket: Socket = req.app.get("socketio");
            socket.emit(SocketEvent.MODIFY_ACCOUNTS);

            res.json(editedAccount);
        } catch (error) {
            sendError(error, res);
        }
    }
);

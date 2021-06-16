import express, {Response} from "express";
import {AuthRequest} from "../utils/types";
import {HTTP, SocketEvent} from "../../../shared/src/enums";
import {sendError} from "../utils/utils";
import {validateRequest} from "../utils/validation";
import {auth} from "../middleware/auth";
import PullRequestService from "../services/PullRequestService";
import {editPrSchema, newPrSchema} from "../models/PullRequest";
import {NewPrRequest, EditPrRequest} from "../../../shared/src/resource_models/pullRequest";
import {Socket} from "socket.io";

export const router = express.Router();

// get all PRs
router.get("/", async (req: AuthRequest<any>, res: Response) => {
    res.json(await PullRequestService.getAll());
});

// create new PR
router.post("/", auth, async (req: AuthRequest<NewPrRequest>, res: Response) => {
    try {
        if (!await validateRequest(newPrSchema, req, res)) return;

        const requestBody: NewPrRequest = req.body;
        const pullRequest = await PullRequestService.create(requestBody, req.account, res);
        if (!pullRequest) return;

        // socket
        const socket: Socket = req.app.get("socketio");
        socket.emit(SocketEvent.MODIFY_PULL_REQUESTS);

        res.status(HTTP.CREATED).json(pullRequest);

    } catch (error) {
        sendError(error, res);
    }
});

// edit existing PR
router.put("/:id", auth, async (req: AuthRequest<EditPrRequest & {id: number}>, res: Response) => {
    try {
        if (!await validateRequest(editPrSchema, req, res)) return;

        const id = req.params.id;
        const requestBody: EditPrRequest = req.body;

        const editedPr = await PullRequestService.edit(requestBody, id, res);
        if (!editedPr) return;

        // socket
        const socket: Socket = req.app.get("socketio");
        socket.emit(SocketEvent.MODIFY_PULL_REQUESTS);

        res.json(editedPr);
    } catch (error) {
        sendError(error, res);
    }
});

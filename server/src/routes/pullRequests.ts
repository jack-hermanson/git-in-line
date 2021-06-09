import express, {Response} from "express";
import {AuthRequest, HTTP} from "../utils/types";
import {sendError} from "../utils/utils";
import {validateRequest} from "../utils/validation";
import {auth} from "../middleware/auth";
import PullRequestService from "../services/PullRequestService";
import {PullRequestRequest, pullRequestSchema} from "../models/PullRequest";

export const router = express.Router();

// get all PRs
router.get("/", auth, async (req: AuthRequest<any>, res: Response) => {
    res.json(await PullRequestService.getAll());
});

// create new PR
router.post("/", auth, async (req: AuthRequest<PullRequestRequest>, res: Response) => {
    try {
        if (!await validateRequest(pullRequestSchema, req, res)) return;

        const requestBody: PullRequestRequest = req.body;
        const pullRequest = await PullRequestService.create(requestBody, req.account, res);
        if (!pullRequest) return;

        res.status(HTTP.CREATED).json(pullRequest);

    } catch (error) {
        sendError(error, res);
    }
});

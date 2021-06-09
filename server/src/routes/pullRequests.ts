import express, {Response} from "express";
import {AuthRequest, HTTP} from "../utils/types";
import {sendError} from "../utils/utils";
import {validateRequest} from "../utils/validation";
import {auth} from "../middleware/auth";
import PullRequestService from "../services/PullRequestService";

export const router = express.Router();

// get all PRs
router.get("/", auth, async (req: AuthRequest<any>, res: Response) => {
    res.json(await PullRequestService.getAll());
});

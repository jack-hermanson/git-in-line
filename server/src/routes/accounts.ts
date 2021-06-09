import express, {Response} from "express";
import {AuthRequest} from "../utils/types";

export const router = express.Router();

router.get("/", async (req: AuthRequest<any>, res: Response) => {
    res.json({});
});

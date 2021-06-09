import express, {Response} from "express";
import {AuthRequest, HTTP} from "../utils/types";
import {sendError} from "../utils/utils";
import {validateRequest} from "../utils/validation";
import {auth} from "../middleware/auth";

export const router = express.Router();



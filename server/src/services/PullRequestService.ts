import {HTTP} from "../utils/types";
import {getConnection, Repository} from "typeorm";
import {doesNotConflict} from "../utils/validation";
import {Response} from "express";
import {PullRequest} from "../models/PullRequest";

const getRepos = (): {
    pullRequestRepo: Repository<PullRequest>
} => {
    const connection = getConnection();
    const pullRequestRepo = connection.getRepository(PullRequest);
    return {pullRequestRepo};
};

export default abstract class PullRequestService {
    // get pull requests
    static async getAll(): Promise<PullRequest[]> {
        const {pullRequestRepo} = getRepos();
        return await pullRequestRepo.find();
    }
}
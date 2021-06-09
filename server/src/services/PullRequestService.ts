import {Priority} from "../utils/types";
import {getConnection, Repository} from "typeorm";
import {doesNotConflict} from "../utils/validation";
import {Response} from "express";
import {PullRequest, PullRequestRequest} from "../models/PullRequest";
import {Account} from "../models/Account";

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

    // new PR
    static async create(newPr: PullRequestRequest, account: Account, res: Response): Promise<PullRequest | undefined> {

        // repo
        const {pullRequestRepo} = await getRepos();

        // check for existing PR
        if (!await doesNotConflict({
            repo: pullRequestRepo,
            properties: [
                {name: "gitHubUrl", value: newPr.gitHubUrl}
            ],
            res
        })) {
            return undefined;
        }

        // create the PR
        const pullRequest = new PullRequest();
        pullRequest.gitHubUrl = newPr.gitHubUrl;
        pullRequest.accountId = account.id;
        if (newPr.priority) {
            pullRequest.priority = newPr.priority;
        }
        pullRequest.jiraUrl = newPr.jiraUrl;
        pullRequest.notes = newPr.notes;
        return await pullRequestRepo.save(pullRequest);
    }
}
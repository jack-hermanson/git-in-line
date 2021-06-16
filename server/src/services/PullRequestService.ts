import { HTTP } from "../../../shared/src/enums";
import { getConnection, Repository } from "typeorm";
import { doesNotConflict } from "../utils/validation";
import { Response } from "express";
import { PullRequest } from "../models/PullRequest";
import {
    NewPrRequest,
    EditPrRequest,
} from "../../../shared/src/resource_models/pullRequest";
import { Account } from "../models/Account";

const getRepos = (): {
    pullRequestRepo: Repository<PullRequest>;
} => {
    const connection = getConnection();
    const pullRequestRepo = connection.getRepository(PullRequest);
    return { pullRequestRepo };
};

export default abstract class PullRequestService {
    // get pull requests
    static async getAll(): Promise<PullRequest[]> {
        const { pullRequestRepo } = getRepos();
        return await pullRequestRepo
            .createQueryBuilder("pullRequest")
            .orderBy("updated", "DESC")
            .getMany();
    }

    // new PR
    static async create(
        newPr: NewPrRequest,
        account: Account,
        res: Response
    ): Promise<PullRequest | undefined> {
        // repo
        const { pullRequestRepo } = await getRepos();

        // check for existing PR
        if (
            !(await doesNotConflict({
                repo: pullRequestRepo,
                properties: [{ name: "gitHubUrl", value: newPr.gitHubUrl }],
                res,
            }))
        ) {
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

    // edit PR
    static async edit(
        newPr: EditPrRequest,
        id: number,
        res: Response
    ): Promise<PullRequest | undefined> {
        // repo
        const { pullRequestRepo } = getRepos();

        // get existing PR
        const pullRequest = await pullRequestRepo.findOne(id);
        if (!pullRequest) {
            res.sendStatus(HTTP.NOT_FOUND);
            return undefined;
        }

        // check for conflicts
        if (
            !(await doesNotConflict({
                repo: pullRequestRepo,
                properties: [{ name: "gitHubUrl", value: newPr.gitHubUrl }],
                res: res,
                existingRecord: pullRequest,
            }))
        ) {
            return undefined;
        }

        // save changes
        return await pullRequestRepo.save({
            ...pullRequest,
            ...newPr,
            jiraUrl: newPr.jiraUrl || null,
            notes: newPr.notes || null,
        });
    }
}

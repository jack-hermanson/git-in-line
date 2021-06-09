import {Account, LoginRequest, NewAccountRequest} from "../models/Account";
import {HTTP} from "../utils/types";
import {getConnection, Repository} from "typeorm";
import {doesNotConflict} from "../utils/validation";
import {Response} from "express";
import * as bcrypt from "bcryptjs";

const getRepos = (): {
    accountRepo: Repository<Account>;
} => {
    const connection = getConnection();
    const accountRepo = connection.getRepository(Account);
    return {accountRepo};
};

export default abstract class AccountService {
    // register
    static async register(newAccount: NewAccountRequest, res: Response): Promise<Account | undefined> {
        const {accountRepo} = getRepos();

        // check for existing account
        if (!await doesNotConflict({
            repo: accountRepo,
            properties: [
                {name: "username", value: newAccount.username.toLowerCase()}
            ],
            res: res
        })) {
            return undefined;
        }

        // create the account
        const salt = await bcrypt.genSalt(10);

        const account = new Account();
        account.username = newAccount.username.toLowerCase();
        account.password = await bcrypt.hash(newAccount.password, salt);

        return await accountRepo.save(account);
    }

    // get existing accounts
    static async getAll(): Promise<Account[]> {
        const {accountRepo} = getRepos();
        return await accountRepo.find();
    }

    // log in
    static async getOne(id: number, res: Response): Promise<Account | undefined> {
        const {accountRepo} = getRepos();
        const account = await accountRepo.findOne(id);
        if (!account) {
            res.sendStatus(HTTP.NOT_FOUND);
            return undefined;
        }
        return account;
    }
}


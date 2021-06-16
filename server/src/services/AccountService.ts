import {Account} from "../models/Account";
import {LoginRequest, NewAccountRequest} from "../../../shared/src/resource_models/account";
import {HTTP} from "../../../shared/src/enums";
import {getConnection, Repository} from "typeorm";
import {doesNotConflict} from "../utils/validation";
import {Response} from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

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

    // get one account
    static async getOne(id: number, res: Response): Promise<Account | undefined> {
        const {accountRepo} = getRepos();
        const account = await accountRepo.findOne(id);
        if (!account) {
            res.sendStatus(HTTP.NOT_FOUND);
            return undefined;
        }
        return account;
    }

    // log in
    static async logIn(loginRequest: LoginRequest, res: Response): Promise<Account | undefined> {
        const {accountRepo} = getRepos();
        const account = await accountRepo.findOne({username: loginRequest.username.toLowerCase()});
        if (!account) {
            res.sendStatus(HTTP.NOT_FOUND);
            return undefined;
        }

        const passwordIsValid = await bcrypt.compare(loginRequest.password, account.password);
        if (!passwordIsValid) {
            res.sendStatus(HTTP.BAD_REQUEST);
            return undefined;
        }

        const token = jwt.sign(
            {id: account.id},
            process.env.SECRET_KEY,
            {
                expiresIn: "60 minutes"
            }
        );

        await accountRepo.update(account, {token});
        return await accountRepo.findOne({id: account.id});
    }

    // log out
    static async logOut(account: Account): Promise<void> {
        const {accountRepo} = getRepos();
        await accountRepo.save({
            ...account,
            token: undefined
        });
    }
}


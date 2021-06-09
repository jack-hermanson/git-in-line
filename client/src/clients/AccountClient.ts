import AccountModel from "../models/AccountModel";
import axios from "axios";
import {LoginRequest} from "../utils/types";

export default abstract class AccountClient {
    static baseUrl = "/api/account";

    static async logIn({username, password}: LoginRequest): Promise<AccountModel> {
        return await axios.post(this.baseUrl, {
            username,
            password
        });
    }
}
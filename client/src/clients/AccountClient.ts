import AccountModel from "../models/AccountModel";
import axios from "axios";

export default abstract class AccountClient {
    static baseUrl = "/api/account";

    static async logIn(username: string, password: string): Promise<AccountModel> {
        return await axios.post(this.baseUrl, {
            username,
            password
        });
    }
}
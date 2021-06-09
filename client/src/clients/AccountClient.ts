import AccountModel from "../models/AccountModel";
import axios from "axios";
import {LoginRequest} from "../utils/types";

export default abstract class AccountClient {
    static baseUrl = "/api/accounts";

    static async logIn({username, password}: LoginRequest): Promise<AccountModel> {
        const response = await axios.post(`${this.baseUrl}/login`, {
            username,
            password
        });
        return response.data;
    }
}
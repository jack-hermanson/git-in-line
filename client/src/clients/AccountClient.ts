import {AccountRecord, LoginRequest} from "../models/account";
import axios from "axios";

export default abstract class AccountClient {
    static baseUrl = "/api/accounts";

    static async logIn({username, password}: LoginRequest): Promise<AccountRecord> {
        const response = await axios.post(`${this.baseUrl}/login`, {
            username,
            password
        });
        return response.data;
    }
}
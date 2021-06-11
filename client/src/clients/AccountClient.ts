import {AccountRecord, LoginRequest} from "../models/account";
import axios from "axios";
import {getAuthHeader} from "../utils";

export default abstract class AccountClient {
    static baseUrl = "/api/accounts";

    static async logIn({username, password}: LoginRequest) {
        const response = await axios.post<AccountRecord>(`${this.baseUrl}/login`, {
            username,
            password
        });
        return response.data;
    }

    static async fetchAccounts(token: string) {
        try {
            const response = await axios.get<AccountRecord[]>(this.baseUrl, getAuthHeader(token));
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                console.log("Not logged in; cannot fetch users.")
            } else {
                console.error(error);
            }
            return undefined;
        }
    }

    static async logOut(token: string) {
        await axios.post<void>(`${this.baseUrl}/logout`, null, getAuthHeader(token));
    }
}
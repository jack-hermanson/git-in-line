export default class AccountModel {
    constructor(id: number, username: string, token?: string) {
        this.id = id;
        this.username = username;
        this.token = token;
    }

    id: number;
    username: string;
    token?: string;
}
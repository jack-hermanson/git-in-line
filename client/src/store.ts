import {createStore, createTypedHooks, action, Action, thunk, Thunk} from "easy-peasy";
import {AccountRecord, LoginRequest} from "./models/account";
import AccountClient from "./clients/AccountClient";
import PullRequestClient from "./clients/PullRequestClient";
import {EditPullRequestRequest, PullRequestRecord, PullRequestRequest} from "./models/pullRequest";
import {AlertItem, errorAlert, successAlert} from "./models/alert";

interface StoreModel {
    currentUser: AccountRecord | undefined;
    setCurrentUser: Action<StoreModel, AccountRecord | undefined>;
    logIn: Thunk<StoreModel, LoginRequest>;
    logOut: Thunk<StoreModel, string>;

    accounts: AccountRecord[] | undefined;
    setAccounts: Action<StoreModel, AccountRecord[] | undefined>;
    loadAccounts: Thunk<StoreModel, string>;

    pullRequests: PullRequestRecord[] | undefined;
    setPullRequests: Action<StoreModel, PullRequestRecord[]>;
    savePullRequest: Thunk<StoreModel, { pullRequest: PullRequestRequest; token: string; }>;
    loadPullRequests: Thunk<StoreModel>;
    editPullRequest: Thunk<StoreModel, { pullRequest: EditPullRequestRequest; token: string; }>;

    alerts: AlertItem[];
    setAlerts: Action<StoreModel, AlertItem[]>;
    addAlert: Action<StoreModel, AlertItem>;
}

export const store = createStore<StoreModel>({
    currentUser: undefined,
    setCurrentUser: action((state, payload) => {
        state.currentUser = payload;
    }),
    logIn: thunk(async (actions, payload) => {
        try {
            const user = await AccountClient.logIn(payload);
            actions.setCurrentUser(user);
        } catch (error) {
            actions.addAlert(errorAlert("Login failed."));
            console.error(error);
            throw error;
        }
    }),
    logOut: thunk(async (actions, token) => {
        try {
            await AccountClient.logOut(token);
        } catch (error) {
            // something went wrong; maybe the token already expired
            // it's fine
            console.error(error);
        }
        actions.setCurrentUser(undefined);
        actions.addAlert(successAlert("user", "logged out"));
    }),

    accounts: undefined,
    setAccounts: action((state, payload) => {
        state.accounts = payload;
    }),
    loadAccounts: thunk(async (actions, token) => {
        actions.setAccounts(await AccountClient.fetchAccounts(token));
    }),

    pullRequests: undefined,
    setPullRequests: action((state, payload) => {
        state.pullRequests = payload;
    }),
    savePullRequest: thunk(async (actions, {pullRequest, token}) => {
        try {
            await PullRequestClient.create(pullRequest, token);
            actions.addAlert(successAlert("pull request", "created"));
        } catch (error) {
            const errorText = `Failed to save pull request. ${error.message}.`;
            actions.addAlert(errorAlert(errorText));
            console.log(error.response);
            throw error;
        }
    }),
    loadPullRequests: thunk(async (actions) => {
        const pullRequests = await PullRequestClient.getAll();
        actions.setPullRequests(pullRequests);
    }),
    editPullRequest: thunk(async (actions, payload) => {
        try {
            await PullRequestClient.edit(payload.pullRequest, payload.token);
            actions.addAlert(successAlert("pull request", "updated"));
        } catch (error) {
            console.error(error.response);
            actions.addAlert(errorAlert(error.message));
        }
    }),

    alerts: [],
    setAlerts: action((state, payload) => {
        state.alerts = payload;
    }),
    addAlert: action((state, payload) => {
        state.alerts = [payload, ...state.alerts];
    })
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;


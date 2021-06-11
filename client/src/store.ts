import {createStore, createTypedHooks, action, Action, thunk, Thunk, Store} from "easy-peasy";
import {AccountRecord, LoginRequest} from "./models/account";
import AccountClient from "./clients/AccountClient";
import PullRequestClient from "./clients/PullRequestClient";
import {PullRequestRecord, PullRequestRequest} from "./models/pullRequest";
import {AlertItem, errorAlert, successAlert} from "./models/alert";

interface StoreModel {
    currentUser: AccountRecord | undefined;
    setCurrentUser: Action<StoreModel, AccountRecord>;
    logIn: Thunk<StoreModel, LoginRequest>;

    pullRequests: PullRequestRecord[] | undefined;
    setPullRequests: Action<StoreModel, PullRequestRecord[]>;
    savePullRequest: Thunk<StoreModel, { pullRequest: PullRequestRequest; token: string; }>;
    loadPullRequests: Thunk<StoreModel>;

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


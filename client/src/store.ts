import {createStore, createTypedHooks, action, Action, thunk, Thunk} from "easy-peasy";
import {AccountRecord, LoginRequest} from "./models/account";
import AccountClient from "./clients/AccountClient";
import PullRequestClient from "./clients/PullRequestClient";
import {PullRequestRecord, PullRequestRequest} from "./models/pullRequest";

interface StoreModel {
    currentUser: AccountRecord | undefined;
    setCurrentUser: Action<StoreModel, AccountRecord>;
    logIn: Thunk<StoreModel, LoginRequest>;

    pullRequests: PullRequestRecord[];
    setPullRequests: Action<StoreModel, PullRequestRecord[]>;
    savePullRequest: Thunk<StoreModel, { pullRequest: PullRequestRequest; token: string; }>;
}

export const store = createStore<StoreModel>({
    currentUser: undefined,
    setCurrentUser: action((state, payload) => {
        state.currentUser = payload;
    }),
    logIn: thunk(async (actions, payload) => {
        const user = await AccountClient.logIn(payload);
        actions.setCurrentUser(user);
    }),

    pullRequests: [],
    setPullRequests: action((state, payload) => {
        state.pullRequests = payload;
    }),
    savePullRequest: thunk(async (actions, {pullRequest, token}) => {
        await PullRequestClient.create(pullRequest, token);
    })
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;


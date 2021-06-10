import {createStore, createTypedHooks, action, Action, thunk, Thunk} from "easy-peasy";
import {AccountRecord, LoginRequest} from "./models/account";
import AccountClient from "./clients/AccountClient";

interface StoreModel {
    currentUser: AccountRecord | undefined;
    setCurrentUser: Action<StoreModel, AccountRecord>;
    logIn: Thunk<StoreModel, LoginRequest>;
}

export const store = createStore<StoreModel>({
    currentUser: undefined,
    setCurrentUser: action((state, payload) => {
        state.currentUser = payload;
    }),
    logIn: thunk(async (actions, payload) => {
        const user = await AccountClient.logIn(payload);
        actions.setCurrentUser(user);
    })
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;


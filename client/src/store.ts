import {createStore, createTypedHooks, action, Action, thunk, Thunk} from "easy-peasy";
import AccountModel from "./models/AccountModel";
import {LoginRequest} from "./utils/types";
import AccountClient from "./clients/AccountClient";

interface StoreModel {
    currentUser: AccountModel | undefined;
    setCurrentUser: Action<StoreModel, AccountModel>;
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


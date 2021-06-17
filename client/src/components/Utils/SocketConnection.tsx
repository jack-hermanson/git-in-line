import React, { Fragment, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useStoreActions, useStoreState } from "../../store";
import { SocketEvent } from "../../../../shared/src/enums";

export const SocketConnection: React.FC = () => {
    const loadPullRequests = useStoreActions(
        (actions) => actions.loadPullRequests
    );
    const loadAccounts = useStoreActions((actions) => actions.loadAccounts);
    const currentUser = useStoreState((state) => state.currentUser);

    useEffect(() => {
        const socket: Socket = io("/");

        // event handlers

        socket.on(SocketEvent.MODIFY_PULL_REQUESTS, () => {
            console.log(
                "Pull requests have been modified. Time to fetch them again."
            );
            loadPullRequests();
        });

        socket.on(SocketEvent.MODIFY_ACCOUNTS, () => {
            if (currentUser?.token) {
                console.log("An account was modified. Re-fetch.");
                loadAccounts(currentUser.token);
            }
        });
    }, [loadPullRequests, currentUser, loadAccounts]);

    return <Fragment />;
};

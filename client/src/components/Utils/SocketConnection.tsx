import React, { Fragment, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SocketEvent } from "../../utils/utils";
import { useStoreActions } from "../../store";

export const SocketConnection: React.FC = () => {
    const loadPullRequests = useStoreActions(
        (actions) => actions.loadPullRequests
    );

    useEffect(() => {
        const socket: Socket = io("/");

        // event handlers
        socket.on(SocketEvent.MODIFY_PULL_REQUESTS, () => {
            console.log(
                "Pull requests have been modified. Time to fetch them again."
            );
            loadPullRequests();
        });
    }, [loadPullRequests]);

    return <Fragment />;
};

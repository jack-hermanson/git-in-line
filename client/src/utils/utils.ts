import React from "react";

interface AuthHeader {
    headers: {
        Authentication: string;
    };
}
export const getAuthHeader = (token: string): AuthHeader => {
    return {
        headers: {
            Authentication: `Bearer ${token}`,
        },
    };
};

export const scrollToTop = (): void => {
    window.scrollTo(0, 0);
};

export interface KeyValPair {
    key: string;
    val: string | number | React.ReactNode;
}

export const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString([], {
        day: "numeric",
        month: "numeric",
    });
};

export const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
    });
};

export const formatDateTime = (date: Date): string => {
    return `${formatDate(date)} ${formatTime(date)}`;
};

export enum SocketEvent {
    MODIFY_PULL_REQUESTS = "modify_pull_requests",
}

export interface ValueLabelPair<T> {
    value: T;
    label: string;
}

export const enumToValueLabelPairs = <T>(
    enumMap: Map<T, string>
): ValueLabelPair<T>[] => {
    return Array.from(enumMap).map((p) => {
        return {
            value: p[0],
            label: p[1],
        };
    });
};

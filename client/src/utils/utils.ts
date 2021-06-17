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

export const removeTime = (date: Date): Date => {
    return new Date(new Date(date).setHours(0, 0, 0));
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

export const capitalizeFirstLetter = (text: string): string => {
    return `${text.charAt(0).toUpperCase()}${text.substring(1)}`;
};

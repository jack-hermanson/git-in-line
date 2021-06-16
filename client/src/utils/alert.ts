export interface AlertItem {
    text: string;
    color: string;
}

export const errorAlert = (text: string): AlertItem => {
    return {
        text,
        color: "danger",
    };
};

export const successAlert = (
    noun: string,
    pastTenseVerb: string
): AlertItem => {
    return {
        text: `${noun.charAt(0).toUpperCase()}${noun.substr(
            1
        )} ${pastTenseVerb} successfully.`,
        color: "success",
    };
};


interface AuthHeader {
    headers: {
        Authentication: string;
    };
}
export const getAuthHeader = (token: string): AuthHeader => {
    return {
        headers: {
            Authentication: `Bearer ${token}`
        }
    };
};
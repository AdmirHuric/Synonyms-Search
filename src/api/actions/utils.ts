import Cookies from 'js-cookie';
import { authorizeUser } from './users';
import { TSynonymsResponse } from './types';

const extractToken = (): string | undefined => {
    return Cookies.get('token');
};

const withSessionToken = async <T>(callback: (sessionToken: string, callbackParams: T) => Promise<TSynonymsResponse>, callbackParams: T) => {
    let sessionToken: string | undefined = extractToken(),
        synonymsResponse: TSynonymsResponse = {
            synonymsList: [],
            ok: false
        };

    if (!sessionToken) {
        await authorizeUser();
        sessionToken = extractToken();

        if (sessionToken) {
            synonymsResponse = await callback(sessionToken, callbackParams);
            return synonymsResponse;
        } else {
            return synonymsResponse;
        }
    } else {
        synonymsResponse = await callback(sessionToken, callbackParams);
        return synonymsResponse;
    }
};

export { extractToken, withSessionToken };

import Cookies from 'js-cookie';
import { authorizeUser } from './users';
import { TSynonymsResponse } from './types';

const extractToken = (): string | undefined => {
    return Cookies.get('token');
};

const withSessionToken = async <T>(callback: (sessionToken: string, callbackParams: T) => Promise<TSynonymsResponse>, callbackParams: T): Promise<TSynonymsResponse> => {
    let sessionToken: string | undefined = extractToken(),
        synonymsResponse: TSynonymsResponse | undefined = {
            synonymsList: [],
            ok: false
        };

    if (!sessionToken) {
        await authorizeUser();
        synonymsResponse = await withSessionToken(callback, callbackParams);
        return synonymsResponse;
    } else {
        synonymsResponse = await callback(sessionToken, callbackParams);
        return synonymsResponse;
    }
};

export { extractToken, withSessionToken };

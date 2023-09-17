import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { extractToken } from './utils';
import { TResponseToken } from './types';
import config from '../../config/config';

const { user, apiUrl, authorizeUserMaxRetries, messages } = config,
    { userAuthorized, userNotAuthorized } = messages;
let authorizeUserRetries = 0;

const retryAuthorizeUser = () => {
    if (authorizeUserRetries < authorizeUserMaxRetries) {
        authorizeUserRetries += 1;
        authorizeUser();
    } else {
        toast(userNotAuthorized, { type: 'error' });
    }
};

const authorizeUser = async () => {
    const sessionToken = extractToken();

    if (!sessionToken) {
        try {
            const response = await fetch(`${apiUrl}/api/users/authorize`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) });

            if (!response.ok) {
                retryAuthorizeUser();
            } else {
                const responseData = await response.json(),
                    { token, expiresIn, message } = responseData.data as TResponseToken,
                    todayDate = new Date(),
                    expiresInDate = new Date(expiresIn);

                Cookies.set('token', token, { expires: expiresInDate.getDate() - todayDate.getDate() });
                toast(message || userAuthorized, { type: 'success' });
            }
        } catch (error) {
            retryAuthorizeUser();
        }
    }
};

export { authorizeUser, retryAuthorizeUser };

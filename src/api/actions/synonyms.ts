import { toast } from 'react-toastify';
import config from '../../config/config';
import extractToken from './utils';
import { authorizeUser } from './users';

type TResponseData = {
    synonyms: string[];
    message: string;
};

type TSynonymsResponse = {
    synonymsList: string[];
    ok: boolean;
};

const { apiUrl, messages, statusCodes } = config,
    { success } = statusCodes,
    { synonymsListEmpty, synonymsSuccessfullyLoaded, synonymsLoadFailed } = messages;

const getSynonyms = async (sessionToken: string, word: string): Promise<TSynonymsResponse> => {
    let synonymsResponse: TSynonymsResponse = {
        synonymsList: [],
        ok: false
    };

    try {
        const response = await fetch(`${apiUrl}/api/synonyms/get/${word}`, { headers: { Authorization: `Bearer ${sessionToken}` } }),
            { ok, status } = response,
            responseData = await response.json(),
            { synonyms, message } = responseData.data as TResponseData,
            hasSynonyms = synonyms?.length > 0;

        synonymsResponse = {
            synonymsList: hasSynonyms ? synonyms : [],
            ok
        };
        toast(message || (hasSynonyms && synonymsSuccessfullyLoaded) || synonymsListEmpty, { type: (hasSynonyms && 'success') || 'warning' });
    } catch (error) {
        toast(synonymsLoadFailed, { type: 'error' });
    } finally {
        return synonymsResponse;
    }
};

const getSynonymsList = async (word: string) => {
    let sessionToken: string | undefined = extractToken(),
        synonymsResponse: TSynonymsResponse = {
            synonymsList: [],
            ok: false
        };

    if (!sessionToken) {
        await authorizeUser();
        sessionToken = extractToken();
        if (sessionToken) {
            synonymsResponse = await getSynonyms(sessionToken, word);
            return synonymsResponse;
        } else {
            return synonymsResponse;
        }
    } else {
        synonymsResponse = await getSynonyms(sessionToken, word);
        return synonymsResponse;
    }
};

export { getSynonymsList };

import { toast } from 'react-toastify';
import { withSessionToken } from './utils';
import { TSynonymsResponse, TSynonymsBody, TResponseData } from './types';
import config from '../../config/config';

const { apiUrl, messages } = config,
    { synonymsListEmpty, synonymsSuccessfullyLoaded, synonymsLoadFailed, addNewSynonymFailed, deleteSynonymFailed } = messages,
    synonymsApiRoute = `${apiUrl}/api/synonyms`;

const getSynonymsApiCall = async (sessionToken: string, word: string): Promise<TSynonymsResponse> => {
    let synonymsResponse: TSynonymsResponse = {
        synonymsList: [],
        ok: false
    };

    try {
        const response = await fetch(`${synonymsApiRoute}/get/${word}`, { headers: { Authorization: `Bearer ${sessionToken}` } }),
            { ok } = response,
            responseData = await response.json(),
            { synonyms, message } = responseData.data as TResponseData,
            hasSynonyms = synonyms?.length > 0;

        synonymsResponse = {
            synonymsList: hasSynonyms ? synonyms : [],
            ok
        };

        toast(message || (hasSynonyms && synonymsSuccessfullyLoaded) || synonymsListEmpty, { type: !ok ? 'error' : (hasSynonyms && 'success') || 'warning' });
    } catch (error) {
        //Error messages from catch close are undescriptive so we show custom message, but we log it here and for rest of api calls
        console.log(error);
        toast(synonymsLoadFailed, { type: 'error' });
    } finally {
        return synonymsResponse;
    }
};

const addSynonymApiCall = async (sessionToken: string, synonymsBody: TSynonymsBody): Promise<TSynonymsResponse> => {
    let synonymsResponse: TSynonymsResponse = {
        synonymsList: [],
        ok: false
    };

    try {
        const response = await fetch(`${synonymsApiRoute}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` },
                body: JSON.stringify(synonymsBody)
            }),
            { ok } = response,
            responseData = await response.json(),
            { synonyms, message } = responseData.data as TResponseData,
            hasSynonyms = synonyms?.length > 0;

        synonymsResponse = {
            synonymsList: hasSynonyms ? synonyms : [],
            ok
        };

        toast(message, { type: !ok ? 'error' : 'success' });
    } catch (error) {
        console.log(error);
        toast(addNewSynonymFailed);
    } finally {
        return synonymsResponse;
    }
};

const deleteSynonymApiCall = async (sessionToken: string, synonymsBody: TSynonymsBody): Promise<TSynonymsResponse> => {
    let synonymsResponse: TSynonymsResponse = {
        synonymsList: [],
        ok: false
    };

    try {
        const { word, synonym } = synonymsBody,
            response = await fetch(`${synonymsApiRoute}/delete/${word}/${synonym}`, { method: 'DELETE', headers: { Authorization: `Bearer ${sessionToken}` } }),
            { ok } = response,
            responseData = await response.json(),
            { synonyms, message } = responseData.data as TResponseData,
            hasSynonyms = synonyms?.length > 0;

        synonymsResponse = {
            synonymsList: hasSynonyms ? synonyms : [],
            ok
        };

        toast(message, { type: !ok ? 'error' : 'success' });

        if (!hasSynonyms) {
            toast(synonymsListEmpty, { type: 'warning' });
        }
    } catch (error) {
        console.log('error');
        toast(deleteSynonymFailed, { type: 'error' });
    } finally {
        return synonymsResponse;
    }
};

const getSynonymsList = async (word: string) => {
    const synonymsResponse: TSynonymsResponse = await withSessionToken(getSynonymsApiCall, word);
    return synonymsResponse;
};

const addSynonym = async (synonymsBody: TSynonymsBody) => {
    const synonymsResponse: TSynonymsResponse = await withSessionToken(addSynonymApiCall, synonymsBody);
    return synonymsResponse;
};

const deleteSynonym = async (synonymsBody: TSynonymsBody) => {
    const synonymsResponse: TSynonymsResponse = await withSessionToken(deleteSynonymApiCall, synonymsBody);
    return synonymsResponse;
};

export { getSynonymsList, addSynonym, deleteSynonym };

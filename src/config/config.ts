import dotenv from 'dotenv';

dotenv.config();

const user = {
        username: 'testusername',
        password: 'testpassword'
    },
    messages = {
        userAuthorized: 'User Authorized',
        userNotAuthorized: 'User not authorized, please try again later.',
        synonymsSuccessfullyLoaded: 'Synonyms successfully loaded.',
        synonymsListEmpty: 'This word does not have synonyms, please add one.',
        synonymsLoadFailed: 'Could not get synonyms list.',
        addNewSynonymFailed: 'Could not add new synonym.',
        deleteSynonymFailed: 'Could not delete synonym.'
    };

const config = {
    authorizeUserMaxRetries: 3,
    apiUrl: import.meta.env.API_URL || 'http://localhost:3000',
    wordInputDelay: 1000,
    user,
    messages
};

export default config;

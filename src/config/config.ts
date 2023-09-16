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
        synonymsListEmpty: 'This word does not have any synonyms yet, please add one.',
        synonymsLoadFailed: 'Could not get synonyms list.'
    },
    statusCodes = {
        success: 200,
        unproccessable: 422
    };

const config = {
    port: process.env.PORT || 3001,
    authorizeUserMaxRetries: Number.parseInt(process.env.AUTHORIZE_USER_MAX_RETRIES) || 3,
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    wordInputDelay: 1000,
    user,
    messages,
    statusCodes
};

export default config;

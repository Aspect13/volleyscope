import Store from './Store';
import {logoutUser} from "./Components/Auth/LoginHandler";
export const API_PATH = module.hot ? 'http://localhost:5000/' : `${window.location.origin}/`;

export const TOKEN_KEY_FRONTEND = 'JWT';
export const TOKEN_KEY_BACKEND = 'access_token';

export const customFetch = async (location, config={}) => {
    const defaultConfig = {
        method: 'GET',
        headers: {'Authorization': `JWT ${localStorage.getItem(TOKEN_KEY_FRONTEND)}`},
    };
    let newConfig = {...defaultConfig, ...config, headers: {...defaultConfig.headers, ...config.headers}};
    // console.log('FETCH CONFIG', newConfig);

    // if (module.hot) newConfig = {...newConfig, mode: 'no-cors'};

    let response = await fetch(API_PATH + location, newConfig);
    if (response.status === 401) {
        Store.dispatch(logoutUser());
        throw new Error(response.message);
        // return
    }
    return response;
};
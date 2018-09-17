export const API_PATH = module.hot ? 'http://localhost:5000/' : `${window.location.origin}/`;

export const TOKEN_LOCAL_KEY = 'JWT';

export const customFetch = async (location, config={}) => {
    const defaultConfig = {
        method: 'GET',
        headers: {'Authorization': `JWT ${localStorage.getItem(TOKEN_LOCAL_KEY)}`}
    };
    let newConfig = {...defaultConfig, ...config, headers: {...defaultConfig.headers, ...config.headers}};
    // console.log('FETCH CONFIG', newConfig);
    let response = await fetch(API_PATH + location, newConfig);
    if (response.status === 401) {
        Store.dispatch(logoutUser());
        throw new Error(response.message);
        // return
    }
    return response;
};
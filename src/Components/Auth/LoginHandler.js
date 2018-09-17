import {TOKEN_LOCAL_KEY} from "../../Api";

const BACKEND_TOKEN_KEY = 'access_token';

export const errorToJSON = err => {
    if (err instanceof Error) {
        return {[err.stack]: err.message};
    }
    return err
};

const loginUser = creds => {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(creds)
    };
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: creds
        });

        return fetch(API_PATH + '/auth/', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
                if (!response.ok) {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: user
                    });
                    return Promise.reject(user);
                } else {
                    localStorage.setItem(TOKEN_LOCAL_KEY, user[BACKEND_TOKEN_KEY]);
                    dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            }).catch(err => {
                console.log("Auth Error: ", err);
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: errorToJSON(err)
                });
            })
    }
};
export default loginUser;
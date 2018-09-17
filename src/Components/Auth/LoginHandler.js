import {API_PATH, TOKEN_KEY_BACKEND, TOKEN_KEY_FRONTEND} from "../../Api";
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST} from "../../Reducers/Actions";



export const errorToJSON = err => {
    if (err instanceof Error) {
        return {[err.name]: err.message};
    }
    return err
};

export const errorToMsg = err => {
    if (err instanceof Error) {
        return `${err.name}: ${err.message}`;
    }
    return `${err.error}: ${err.description}`;
};


export const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY_FRONTEND);
    return dispatch => dispatch({type: LOGOUT_REQUEST,});
};

export const loginUser = creds => {
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

        return fetch(API_PATH + 'auth', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
                if (!response.ok) {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: user,
                    });
                    return Promise.reject(user);
                } else {
                    localStorage.setItem(TOKEN_KEY_FRONTEND, user[TOKEN_KEY_BACKEND]);
                    dispatch({
                        type: LOGIN_SUCCESS,
                    });
                }
            }).catch(err => {
                console.log("Auth Error: ", err);
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: errorToMsg(err),
                });
            })
    }
};
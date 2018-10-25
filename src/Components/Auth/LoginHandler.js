import {API_PATH, customFetch, TOKEN_KEY_BACKEND, TOKEN_KEY_FRONTEND} from "../../Api";
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

const getUserData = async config => {
    const response = await fetch(API_PATH + 'auth', config);
    const data = await response.json();
    console.log('QQQQQQQQQq', 'data:', data, 'response:', response.status);
    console.log(!response.ok, data.description || 'CUSTOM ERROR MESSAGE');


    if (!response.ok) {
        let e = new Error();
        e.message = data.description || 'CUSTOM ERROR MESSAGE';
        throw e;
    }
    return data
};

export const setUser = dispatch => {
    try {
        const token = localStorage.getItem(TOKEN_KEY_FRONTEND);
        const id = JSON.parse(atob(token.split('.')[1]))['identity'];
        customFetch(`users/${id}`)
            .then(response => response.json().then(data => {
                console.log('user set success?', data, dispatch);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data
                });
            }))
    } catch (e) {
        console.log('setUser err', e);
        dispatch(logoutUser());
    }

        // .catch(e => {
        //
        // });

};

export const loginUser = creds=> {
    let config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // data: JSON.stringify(creds),
        body: JSON.stringify(creds),
    };

    // if (module.hot) config = {...config, mode: 'no-cors'};

    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: creds
        });

        console.log('credscredscredscreds', creds, dispatch);
        // setTimeout(async () => {
            getUserData(config)
                .then(data => {
                    console.log('ttttttt', data);
                    localStorage.setItem(TOKEN_KEY_FRONTEND, data[TOKEN_KEY_BACKEND]);
                    setUser(dispatch);
                })
                .catch(err => {
                    console.log('error caught', err.message, dispatch);
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: err.message
                    })
                });
            // if (tokenData.status_code !== 200) {
            //     dispatch({
            //         type: LOGIN_FAILURE,
            //         payload: tokenData.description
            //     })
            // } else {

            // }
        // }, 3000);



        /*
        return fetch(API_PATH + 'auth/', config)
            .then(response =>
                response.json().then(user => {
                    return { user, response }
                })
            ).then(({ user, response }) => {
                if (!response.ok) {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: user,
                    });
                    return Promise.reject(user);
                } else if (1===2) {

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
        */
    };
};
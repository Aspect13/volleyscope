import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, USER_AUTH} from "./Actions";

const initialState = {
    user: null,
    isLoading: false,
    error: '',
};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, isLoading: true, error: null};
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, user: action.payload, error: null};
        case LOGIN_FAILURE:
            return {...state, isLoading: false, user: null, error: action.payload};
        // case USER_AUTH:
        //     return {...state, user: action.payload};
        case LOGOUT_REQUEST:
            return initialState;
        default:
            return state;
    }
};
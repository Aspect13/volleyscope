import {SNACKBAR_RESTORE, SNACKBAR_SHOW} from "./Actions";

const snackBarInitialState = {
    action: null,
    message: null,
    open: false,
};

export default function SnackbarReducer(state = snackBarInitialState, action) {
    switch (action.type) {
        case SNACKBAR_SHOW:
            return {...state, ...action.payload};
        case SNACKBAR_RESTORE:
            return snackBarInitialState;

        default:
            return state;
    }
};
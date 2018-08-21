import {USER_AUTH} from "./Actions";

const initialState = {
};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case USER_AUTH:
            return action.payload;
        default:
            return state;
    }
};
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import SnackbarReducer from './Reducers/SnackbarReducer';


export const appHistory = createBrowserHistory();
const historyMiddleware = routerMiddleware(appHistory);
const loggerMiddleware = createLogger();

const middlewares = localTest => {
    const middlewareDebug = [thunk, loggerMiddleware, historyMiddleware];
    const middlewareLive = [thunk, historyMiddleware];

    if (localTest) {
        return composeWithDevTools(applyMiddleware(...middlewareDebug))
    } else {
        return applyMiddleware(...middlewareLive);
    }
};

const appReducers = combineReducers({
    SnackbarReducer,
});

const Store = createStore(
    connectRouter(appHistory)(appReducers),
    middlewares(module.hot)
);

export default Store;
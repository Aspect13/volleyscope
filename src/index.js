import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Provider from "react-redux/src/components/Provider";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/es/styles/index";
import {Link, Route, Switch} from "react-router-dom";
import Store, {appHistory} from "./Store";
import { ConnectedRouter } from 'connected-react-router';
import App from "./App";

const theme = createMuiTheme();
const NotFound = () => (
    <div style={{width: '100%', fontSize: 'larger'}}>
        The page you are looking for doesn't exist.<br/>Go to <Link to='/' style={{fontWeight: 'bold'}}>homepage</Link>
    </div>
);

ReactDOM.render(
    <Provider store={Store}>
        <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={appHistory}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="*" component={NotFound} status={404}/>
                </Switch>
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

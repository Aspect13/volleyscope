import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Provider from "react-redux/src/components/Provider";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/es/styles/index";
import {Link, Route, Switch} from "react-router-dom";
import Store, {appHistory} from "./Store";
import { ConnectedRouter } from 'connected-react-router';
import App from "./App";
import LoginScreen from "./LoginScreen";

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#26a69a',
            light:'#64d8cb',
            dark:'#00766c',
        },
        secondary: {
            main: '#90a4ae',
            light:'#c1d5e0',
            dark:'#62757f',
        }
    },
});
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
                    <Route exact path='/login' component={ LoginScreen } />
                    <Route path="/" component={App} />
                    <Route path="*" component={NotFound} status={404}/>
                </Switch>
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

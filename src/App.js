import React, {Component} from 'react';
import {Switch, Route, Link, Redirect} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SnackbarCustom from "./SnackbarCustom";

// import 'react-big-calendar/lib/css/react-big-calendar.css';
import {push} from "connected-react-router";
import connect from "react-redux/es/connect/connect";
import {USER_AUTH} from "./Reducers/Actions";
import Fire from './Fire';
import Calendar from "./Components/Calendar";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Paper from "@material-ui/core/Paper/Paper";

const MainPage = (props) => {
    console.log('props',props.user);
    return <div>
        <h1>Hi {props.user.displayName}!</h1>
        <h3>id {props.user.uid}</h3>
        <h3>email {props.user.email}</h3>
        <br/>
        Main page
        <br/>
        <Link to={'/calendar'}>to calendar</Link>
        <br/>
        <button onClick={(event) => {event.preventDefault(); Fire.auth().signOut()}}>Sign Out</button>
        <br/>
    </div>
};

const styles = {
    root: {
        height: '100%',
    },
    circularContainer: {
        height: '100%',
        width: '100%',
    },
    circular: {
        position: 'absolute',
        top: 'calc(50% - 75px)',
        left: 'calc(50% - 75px)',
    },
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this.addAuthListener();
    }

    // Listen to the Firebase Auth state and set the local state.
    addAuthListener = () => Fire.auth().onAuthStateChanged(
        user => {
            console.log('Listener user:', user);
            this.setState({isLoading: false});
            this.props.storeUser(user);
        }
    );

    render() {
        if (this.state.isLoading) return (
            <div style={styles.circularContainer}>
                <CircularProgress
                    size={150}
                    style={styles.circular}
                />
            </div>
        );

        // console.log('APP user ===', this.props.user);
        if (!this.props.user) return <Redirect
            to={{
                pathname: "/login",
                search: `?next=${this.props.location.pathname}`
            }}
        />;

        return (
            <div style={styles.root}>
                <Navbar/>
                <Switch>
                    {/*<Route exact path={'/'} component={MainPage}/>*/}
                    <Route exact path={'/'} render={() => <MainPage user={this.props.user}/>}/>

                    <Route exact path={'/calendar'} component={Calendar}/>
                </Switch>
                <SnackbarCustom/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.UserReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storeUser: userData => dispatch({type: USER_AUTH, payload: userData}),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
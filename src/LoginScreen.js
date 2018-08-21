import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Fire from "./Fire";
import firebase from "firebase";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import './LoginScreen.css';
import Paper from "@material-ui/core/Paper/Paper";

class LoginScreen extends React.Component {
    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            // signInSuccessWithAuthResult: () => false
        },
        signInSuccessUrl: this.props.location.search.next || '/',
        credentialHelper: 'none',
    };

    // Make sure we un-register Firebase observers when the component unmounts.
    // componentWillUnmount = () => this.unregisterAuthObserver();

    // componentDidMount = () => this.addAuthListener();
    //
    // addAuthListener = () => Fire.auth().onAuthStateChanged(
    //     user => {
    //         console.log('QQQQ Listener user:', user);
    //     }
    // );

    render() {
        if (Fire.auth().currentUser) return <Redirect to={{pathname: this.props.location.search.next || '/'}}/>;
        return (
                <Paper id='loginContainer'>
                    <Grid
                        container={true}
                        spacing={0}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <Typography variant="title" style={{color: 'white'}}>Please authorize to continue</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={Fire.auth()}/>
                        </Grid>
                    </Grid>
            </Paper>
        );
        // return <Redirect to={{pathname: this.props.location.search.next || '/'}}/>;
        // return (
        //     <div>
        //         <h1>My App</h1>
        //         <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        //         <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        //         <Button
        //         primary
        //         onClick={() => console.log(firebase.auth().currentUser)}
        //         >
        //             pysh
        //         </Button>
        //     </div>
        // );
    }
}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
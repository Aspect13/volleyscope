// Configure FirebaseUI.
import firebase from "firebase";
import Fire from "../Fire";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";
import React from "react";

const uiConfig = {
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
    // signInSuccessUrl: this.props.location.search.next || '/',
    signInSuccessUrl: window.location.search.next || '/',
    credentialHelper: 'none',
};

const FirebaseLogin = <FirebaseAuth uiConfig={uiConfig} firebaseAuth={Fire.auth()}/>;
export default FirebaseLogin;
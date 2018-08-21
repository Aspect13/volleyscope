import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyC3Vd7-JpIMw3qeawbfTsUoI8GsEWhOqf8",
    authDomain: "sport-scope.firebaseapp.com",
    databaseURL: "https://sport-scope.firebaseio.com",
    projectId: "sport-scope",
    storageBucket: "sport-scope.appspot.com",
    messagingSenderId: "508879014245"
};

const Fire = firebase.initializeApp(config);
export default Fire;

import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Fire from "../Fire";
import firebase from "firebase";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import './LoginScreen.css';
import Paper from "@material-ui/core/Paper/Paper";
import FirebaseLogin from "./FirebaseLogin";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import TextField from "@material-ui/core/TextField/TextField";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


class LoginScreen extends React.Component {
    state = {
        email: null,
        password: null,
        error: null,
        showPassword: false,
    };

    handleClickShowPassword = () => this.setState(state => ({showPassword: !state.showPassword}));

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        // if (Fire.auth().currentUser) return <Redirect to={{pathname: this.props.location.search.next || '/'}}/>;
        console.log('user', this.props.user);
        if (this.props.user) return <Redirect to={{pathname: this.props.location.search.next || '/'}}/>;
        return (
                <Paper id='loginContainer'>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        {/*<Grid item xs={12}>*/}
                            {/*<Typography variant="title" style={{color: 'white'}}>Please authorize to continue</Typography>*/}
                        {/*</Grid>*/}
                        <Grid
                            item
                            xs={12}
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Please authorize to continue</FormLabel>
                                <TextField
                                    variant='filled'
                                    type='text'
                                    margin='normal'
                                    label='Email'
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                />
                                <TextField
                                    variant="filled"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    margin='normal'
                                    label="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment variant="filled" position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                >
                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormHelperText id="name-error-text">Error</FormHelperText>
                            </FormControl>
                            {/*{FirebaseLogin}*/}
                        </Grid>
                    </Grid>
            </Paper>
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

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
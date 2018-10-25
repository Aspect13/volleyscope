import React from 'react';
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Grid from "@material-ui/core/Grid/Grid";
import './LoginScreen.css';
import Paper from "@material-ui/core/Paper/Paper";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import TextField from "@material-ui/core/TextField/TextField";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button/Button";
import {loginUser} from "./LoginHandler";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";


class LoginScreen extends React.Component {
    state = {
        email: 'Vladimir666@mail.rf',
        password: 'iamtheking',
        showPassword: false,
    };

    handleClickShowPassword = () => this.setState(state => ({showPassword: !state.showPassword}));

    handleChange = prop => event => this.setState({ [prop]: event.target.value });

    handleSubmit = () => {
        const {email, password} = this.state;
        this.props.loginUser({email, password});
    };

    render() {
        // if (Fire.auth().currentUser) return <Redirect to={{pathname: this.props.location.search.next || '/'}}/>;
        console.log('user', this.props.user);
        if (this.props.user) return <Redirect to={{pathname: this.props.location.search.next || '/'}}/>;
        return (
                <Paper id='loginContainer'>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                xs={12}
                            >
                                <FormControl component="fieldset" error={!!this.props.error}>
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
                                    <FormHelperText id="name-error-text">{this.props.error}</FormHelperText>

                                </FormControl>
                                {/*{FirebaseLogin}*/}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                {this.props.isLoading && <LinearProgress />}
                                <Button
                                    variant="raised"
                                    type='button'
                                    color='primary'
                                    onClick={this.handleSubmit}
                                    disabled={this.props.isLoading}
                                >
                                    Sign In
                                </Button>

                            </Grid>
                        </Grid>
            </Paper>
        );
    }
}


const mapStateToProps = state => {
    let {user, error, isLoading} = state.UserReducer;
    return {user, error, isLoading};
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: creds => dispatch(loginUser(creds)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
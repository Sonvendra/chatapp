import React from 'react';
import {Link} from 'react-router-dom';
import FormControll from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styles from './styles';
const firebase = require('firebase');
class LoginComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            email: null,
            password: null,
            loginError: ''
        }
    }
    render(){
        const classes = this.props;
        return (
            <main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.Paper}>
                <Typography component="h1" variant="h5">
                Log In
                </Typography>
                <form className={classes.form} onSubmit={(e) => this.loginSubmit(e)}>
                    <FormControll fullWidth required margin="normal">
                        <InputLabel htmlFor="login-email.input">Enter your email</InputLabel>
                        <Input autoComplete="email" id="login-email.input" autoFocus onChange={(e) => this.userTyping('email', e)}></Input>
                    </FormControll>
                    <FormControll fullWidth required margin="normal">
                        <InputLabel htmlFor="login-password.input">Enter your password</InputLabel>
                        <Input type="password" id="login-password.input" onChange={(e) => this.userTyping('password', e)}></Input>
                    </FormControll>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.Button}>Sign In</Button>
                </form>
                {
                    this.state.loginError ?
                    <Typography className={classes.signupError, 'error'} component="h5" varient="h6">
                        Incorrect login Information!
                    </Typography> : null
                }
                <Typography component="h5" variant="h6" className={classes.noAccountHeader}>Already Have An Account?</Typography>
                <Link to="/signup" className={classes.signUpLink}>Sign Up!</Link>
            </Paper>
        </main>
        );
    }
    
    userTyping(type, e){
        switch (type) {
            case 'email':
                this.setState({email: e.target.value})
                break;
            case 'password':
                this.setState({password: e.target.value})
                break;
            default:
                break;
        }
    }
    loginSubmit(e){
        e.preventDefault();
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.props.history.push('/dashboard')
        }, err => {
            this.setState({loginError: err.message});
        });
    }
}

export default withStyles(styles)(LoginComponent);
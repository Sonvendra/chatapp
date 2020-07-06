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
import './styles.css';

const firebase = require('firebase');

class SignupComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError:''
        };
    }

    render(){
        const { classes } = this.props;
        
        return (
        <main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.Paper}>
                <Typography component="h1" variant="h5">
                    Sign Up!
                </Typography>
                <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
                    <FormControll required fullWidth margin='normal'>
                        <InputLabel htmlFor="signup-email-input">Enter Your Email</InputLabel>
                        <Input autoComplete="email" onChange={(e) => this.userTyping('email',e)} id="signup-email-input" autoFocus></Input>
                    </FormControll>
                    <FormControll required fullWidth margin="normal">
                        <InputLabel htmlFor="signup-password-input">Create A Password</InputLabel>
                        <Input type="password" onChange={(e) => this.userTyping('password',e)} id="signup-password-input"></Input>
                    </FormControll>
                    <FormControll required fullWidth margin="normal">
                        <InputLabel htmlFor="signup-password-confirmation-input">Confirm your Password</InputLabel>
                        <Input type="password" onChange={(e) => this.userTyping('passwordConfirmation',e)} id="signup-password-confirmation-input"></Input>
                    </FormControll>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.Button}>Sign Up</Button>
                </form>
                {
                    this.state.signupError ?
                    <Typography className={classes.signupError, 'error'} component="h5" varient="h6">
                        {this.state.signupError}
                    </Typography>
                    : null
                }
                <Typography component="h5" variant="h6" className={classes.hasAccountHeader}>Already Have An Account?</Typography>
                <Link to="/login" className={classes.logInLink}>Log In!</Link>
            </Paper>
        </main> 
            );
    }

    formInvalid = () => this.state.password === this.state.passwordConfirmation;
    userTyping = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
            case 'passwordConfirmation':
                this.setState({passwordConfirmation: e.target.value});
                break;
            default:
                break;
        }
    }
    submitSignup = (e) =>{
        e.preventDefault();
        if(!this.formInvalid){
            this.setState({signupError: "Password do not match!"})
            return;
        };
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(authRes => {
            const userObj = {
                email: authRes.user.email
            };
            firebase
            .firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(() => {
                this.props.history.push('/dashboard')
            }, dbError => {
                console.log(dbError.message)
                this.setState({signupError: "Failed to add User"});
            }, authError => {
                console.log(authError)
                this.setState({signupError: "Failed to add User"});
            })
        });
        
    }
}

export default withStyles(styles)(SignupComponent);
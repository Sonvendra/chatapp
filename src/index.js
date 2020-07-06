import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';
import LoginComponent from './login/login'
import { Route, BrowserRouter as Router} from 'react-router-dom'

const firebase = require('firebase');

firebase.initializeApp({
  apiKey: "AIzaSyBsDk-t92ZKlIsmcJWy-uAd2leGlKgbRyM",
    authDomain: "woo-chatapp.firebaseapp.com",
    databaseURL: "https://woo-chatapp.firebaseio.com",
    projectId: "woo-chatapp",
    storageBucket: "woo-chatapp.appspot.com",
    messagingSenderId: "188134834367",
    appId: "1:188134834367:web:723f175cbe2a9f7caf460a",
    measurementId: "G-X39EHNRYGS"
})

const routing= (
  <Router>
    <div>
      <Route path="/login" component={LoginComponent}></Route>
      <Route path="/signup" component={SignupComponent}></Route>
      <Route path="/dashboard" component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

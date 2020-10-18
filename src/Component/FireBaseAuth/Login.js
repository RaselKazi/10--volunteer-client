import React, { useContext, useState } from 'react';
import './Login.css'
import * as firebase from "firebase";
import { Link, useHistory, useLocation } from 'react-router-dom';
import googleIcon from '../../Image/Icon/google.png';
import logo from '../../Image/logos/Group 1329.png';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';


const Login = () => {

    const [user, setUser] = useContext(UserContext)
console.log(user)
    //redirect to path settings
   
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    //Google sign-in provider
    const Provider = new firebase.auth.GoogleAuthProvider();


    const handleGoogleLogin = () => {


        // Initialize Firebase
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        //Google provider .

        firebase.auth().signInWithPopup(Provider).then(function (result) {
            const { displayName, email , photoURL} = result.user;

            
            const signedInUser = { name: displayName, email , img: photoURL }
            setUser(signedInUser);
            sessionStorage.setItem("user", email);
            sessionStorage.setItem("name", displayName);
            sessionStorage.setItem("photo", photoURL);
            history.replace(from);

        }).catch(function (error) {
            // Handle Errors here.
            const errorMessage = error.message;
        });
    }

    return (

            <>
                <div  className="row">
                    <div className="col-md-12">
                        <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo..." />
                        </Link>
                    </div>
                </div>
            </div>

            <div  className="row">
            <div className="col-md-3">
            </div>
                <div className="col-md-6">
                    <div className="signed-in-option">
                    <div className="title">
                        <h3>Login With</h3>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <button  onClick={handleGoogleLogin}  className="sign-up-btn">
                            <span className="float-left pl-3 google-icon"><img src={googleIcon} alt="" /></span>
                            <span className="text-center mt-2 d-block">Continue with Google</span>
                        </button>
                    </div>
                    <div className="title-footer text-center py-2">
                        <p>Don't have account? <Link to="/" className="create-account">Create an account</Link> </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-3">
    </div>

        </>
    
    );
};

export default Login;
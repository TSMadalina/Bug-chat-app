import React from 'react';
import "./Login.css";
import { Button } from "@mui/material"
import { auth, provider } from '../../firebase';
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [state, dispatch] = useStateValue();
    const history = useNavigate();

    // the whole process of authentification happens here and on the firestore cloud
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                //we dispatched a set user action into the reducer, parsing in the user 
                //that updates it in app.js
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch((error) => {
                alert((error.message));
            });

        history(`/get-started`)
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://i.ibb.co/L9b6g80/imageedit-8-3777420776.png" alt="" />
                <h1>Sign in to Bug Chat App</h1>
                <p>bugchat.app.com</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login

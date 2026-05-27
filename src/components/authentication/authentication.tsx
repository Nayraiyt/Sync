import { auth } from "../../config/firebase.tsx";
import { googleProvider } from "../../config/firebase.tsx";
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth";
import './authentication.css';
import React, { useState } from 'react';

export const Authentication = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () =>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }
        catch(err){
            console.error(err);
        }
    }
    
    const signInWithGoogle = async() => {
        try{
            await signInWithPopup(auth,googleProvider);
        }
        catch(err){
            console.error(err);
        }
    }
    const signOut = async() =>{
        try{
            await signOut();
        }
        catch(err){
            console.error(err);
        }
    }
    return(
        <div className = "main">
            <div className = "background">

            </div>
            <div className = "foreground">
                <h1 className = "title-font">Sync</h1>
                <div className = "email-input">
                    <input 
                    placeholder="Email..." 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className = "password-input">
                    <input
                    placeholder="Password..." 
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"/>
                </div>
                <button className = "buttons base-font b-signin" onClick={signIn}> Sign in </button>
                <button className = "buttons base-font b-google" onClick={signInWithGoogle}> Sign in with Google</button>
                <button className = "buttons base-font b-signout" onClick = {signOut}> Sign out </button>
            </div>
        </div>
    )
}

export default Authentication;
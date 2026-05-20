import { auth } from "../../config/firebase";
import { googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth";
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
            await signOut(auth, googleProvider);
        }
        catch(err){
            console.error(err);
        }
    }
    return(
        <div>
            <input 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                placeholder="Password..." 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button onClick={signIn}> Sign in </button>

            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick = {signOut}> Sign out </button>
        </div>
    )
}

export default Authentication;
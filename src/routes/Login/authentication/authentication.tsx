import { auth, googleProvider } from "../../../config/firebase.tsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import "./authentication.css";

export const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="main">
      <div className="foreground">

        <div className="email-input">
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password-input">
          <input
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="buttons base-font b-signin"
          onClick={login}
        >
          Login
        </button>

        <button
          className="buttons base-font"
          onClick={createAccount}
        >
          Create Account
        </button>

        <button
          className="buttons base-font b-google"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Authentication;
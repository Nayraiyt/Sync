import React, { useState } from "react";
import { Timer } from "./Timer/Timer.tsx";
import { auth } from "../../config/firebase.tsx";
import { signOut } from "firebase/auth";
import "./present.css";
import Maps from "./Maps/Maps.tsx";

type Props = {
  user: any;
};

export const Present = ({ user }: Props) => {
  const [isRunning, setIsRunning] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleRun = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="runMain">
      <div className="runForeground">

          <Timer isRunning={isRunning} />
          <Maps />

        <p> Status: {isRunning ? "Running" : "Stopped"}</p>
        <p> Pace: -- min/km</p>
        <p> Spotify: Not connected</p>

        <div className="runButtons">
          <button
            className="runButton runToggle"
            onClick={toggleRun}
          >
            {isRunning ? "Stop Run" : "Start Run"}
          </button>

          <button className="runButton runConnect">
            Connect Spotify
          </button>

          <button className="runButton runSignOut" onClick={logout}>
            Sign out
          </button>

        </div>

      </div>
    </div>
  );
};
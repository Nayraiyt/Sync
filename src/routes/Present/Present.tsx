import React, { useState } from "react";
import { Timer } from "./Timer/Timer.tsx";
import { auth, database } from "../../config/firebase.tsx";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import "./present.css";
import Maps from "./Maps/Maps.tsx";
import { useDistance } from "./Distance/Distance.tsx";

type Props = {
  user: any;
};

export const Present = ({ user }: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [runId, setRunId] = useState(0);
  const { distanceKm, locations } = useDistance(isRunning,runId);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const saveRun = async () => {
    try {
      await addDoc(
        collection(database, "users", user.uid, "runs"),
        {
          distanceKm,
          route: locations,
          createdAt: serverTimestamp(),
        }
      );

      alert("Run saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save run.");
    }
  };

  const toggleRun = async () => {
    if (!isRunning) {
      setRunId((prev) => prev + 1);
      setIsRunning(true);
      return;
    }

    const shouldSave = window.confirm(
      `Save this run?\n\nDistance: ${distanceKm.toFixed(
        2
      )} km`
    );

    if (shouldSave) {
      await saveRun();
    }

    setIsRunning(false);
  };

  return (
    <div className="runMain">
      <div className="runForeground">
        <Timer isRunning={isRunning} />

        <pre style={{ fontSize: "12px" }}>
          {JSON.stringify(locations[locations.length - 1], null, 2)}
        </pre>
        <Maps locations={locations} />

        <p>
          Status: {isRunning ? "Running" : "Stopped"}
        </p>

        <p>
          Distance: {distanceKm.toFixed(2)} km
        </p>

        <p>Pace: -- min/km</p>

        <p>Spotify: Not connected</p>

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

          <button
            className="runButton runSignOut"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
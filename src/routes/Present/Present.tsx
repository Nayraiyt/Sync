import { useEffect, useRef, useState } from "react";
import { Timer } from "./Timer/Timer.tsx";
import { auth, database } from "../../config/firebase.tsx";
import { signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import "./present.css";
import Maps from "./Maps/Maps.tsx";
import { useDistance } from "./Distance/Distance.tsx";

import { loginWithSpotify } from "./Spodify/SpodifyLogin.tsx";
import { SpodifyImporter } from "./Spodify/SpodifyImport.tsx";

import { paceToBPM } from "./Pace/PaceConvert";
import { getSongs } from "./Pace/PaceConvert";
import { matchSongsByBPM } from "./Pace/PaceConvert";

import { Past } from "../Past/Past.tsx";

import type { Song } from "../../types/song.tsx";

type Props = {
  user: any;
};

export const Present = ({ user }: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [runId, setRunId] = useState(0);
  const [showPastRuns, setShowPastRuns] = useState(false);

  const { distanceKm, locations } = useDistance(isRunning, runId);

  const [targetPace, setTargetPace] = useState(5);
  const [currentPlaylist, setCurrentPlaylist] = useState<any[]>([]);

  const lastBPM = useRef<number | null>(null);

  const spotifyAccessToken = localStorage.getItem("spotify_token");
  console.log("Spotify token:", spotifyAccessToken);
  

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };


  const saveRun = async () => {
    try {
      await addDoc(collection(database, "users", user.uid, "runs"), {
        distanceKm,
        route: locations,
        createdAt: serverTimestamp(),
      });

      alert("Run saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save run.");
    }
  };

  const startRunMusic = async () => {
    const targetBPM = paceToBPM(targetPace);

    const songs = (await getSongs()) as Song[];

    const matched = matchSongsByBPM(songs, targetBPM);

    setCurrentPlaylist(matched.slice(0, 10));

    lastBPM.current = targetBPM;
  };

  const toggleRun = async () => {
    if (!isRunning) {
      setRunId((prev) => prev + 1);
      setIsRunning(true);

      await startRunMusic();
      return;
    }

    const shouldSave = window.confirm(
      `Save this run?\n\nDistance: ${distanceKm.toFixed(2)} km`
    );

    if (shouldSave) {
      await saveRun();
    }

    setIsRunning(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    const exchangeToken = async () => {
      const codeVerifier = localStorage.getItem("code_verifier");

      const body = new URLSearchParams({
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: window.location.origin,
        code_verifier: codeVerifier!,
      });

      const res = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        }
      );

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem(
          "spotify_token",
          data.access_token
        );
      }

      window.location.replace("/");
    };

    exchangeToken();
  }, []);

  return (
    <div className="runMain">
      <div className="runForeground">
        <button
          className="b-past"
          onClick={() =>
            setShowPastRuns((prev) => !prev)
          }
        >
          {showPastRuns ? "Back to Run" : "Past Runs"}
        </button>

        {showPastRuns ? (
          <Past user={user} />
        ) : (
          <>
            <div className="map">
              <Maps locations={locations} />
            </div>

            <div className="run-stats">
              <Timer isRunning={isRunning} />
              <p>Distance: {distanceKm.toFixed(2)} km</p>
               <p>Pace: {targetPace} min/km</p>
            </div>

            <div className="spodify">
              <button className = "b-connectS" onClick={loginWithSpotify}>
                Connect Spotify
              </button>

              <SpodifyImporter />

              <div>
                {currentPlaylist.map((song) => (
                  <div
                    key={song.spotifyTrackId}
                  >
                    <p>{song.name}</p>
                    <p>{song.artist}</p>
                    <p>{song.bpm} BPM</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="runButtons">
              <button
                className="runButton runToggle"
                onClick={toggleRun}
              >
                {isRunning
                  ? "Stop Run"
                  : "Start Run"}
              </button>

              <div className="paceInput">
                <label>Pace(min/km)</label>
                <input className = "pace-input"
                  type="number"
                  step="0.1"
                  min="3"
                  max="10"
                  value={targetPace}
                  onChange={(e) =>
                    setTargetPace(
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <button
                className="runButton runSignOut"
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
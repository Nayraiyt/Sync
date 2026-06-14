import { useEffect, useState } from "react";
import { Timer } from "./Timer/Timer.tsx";
import { auth, database } from "../../config/firebase.tsx";
import { signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Past } from "../Past/Past.tsx";
import "./present.css";
import Maps from "./Maps/Maps.tsx";
import { useDistance } from "./Distance/Distance.tsx";
import { loginWithSpotify } from "./Spodify/SpodifyLogin.tsx";

type Props = {
  user: any;
};

export const Present = ({ user }: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [runId, setRunId] = useState(0);
  const [showPastRuns, setShowPastRuns] = useState(false);

  const { distanceKm, locations } = useDistance(isRunning, runId);

  const spotifyAccessToken =localStorage.getItem("spotify_token");

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

  const toggleRun = async () => {
    // Start Run
    if (!isRunning) {
      setRunId((prev) => prev + 1);
      setIsRunning(true);
      return;
    }

    // Stop Run
    const shouldSave = window.confirm(
      `Save this run?\n\nDistance: ${distanceKm.toFixed(2)} km`,
    );

    if (shouldSave) {
      await saveRun();
    }

    setIsRunning(false);
  };

  useEffect(() => {
      const params = new URLSearchParams(
          window.location.search
      );
      const code = params.get("code");

      if (!code) return;

      const exchangeToken = async () => {
          const codeVerifier =
              localStorage.getItem("code_verifier");

          const body = new URLSearchParams({
              client_id: import.meta.env
                  .VITE_SPOTIFY_CLIENT_ID,
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
                      "Content-Type":
                          "application/x-www-form-urlencoded",
                  },
                  body,
              }
          );

          const data = await res.json();

          localStorage.setItem(
              "spotify_token",
              data.access_token
          );

          window.location.replace("/");
      };

      exchangeToken();
  }, []);

  return (
    <div className="runMain">
      <div className="runForeground">
        <button
          className="b-past"
          onClick={() => setShowPastRuns((prev) => !prev)}
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
            </div>

            <div className = "spodify">
              <p>Spotify: Not connected</p>
              
              <button onClick={loginWithSpotify}> Connect Spotify</button>
            </div>

            <div className="runButtons">
              <button className="runButton runToggle" onClick={toggleRun}>
                {isRunning ? "Stop Run" : "Start Run"}
              </button>

              <button className="runButton runSignOut" onClick={logout}>
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

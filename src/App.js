import logo from './logo.svg';
import './App.css';
import Authentication from "./components/authentication/authentication.js";
import { database } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import React, { useState, useEffect } from 'react';

function App() {
  const [pastRun, setPastRun] = useState([]);

  const pastRunRef = collection(database, "Past Runs");

  useEffect(() => {
    const getPastRun = async () => {
      try {
        const data = await getDocs(pastRunRef);

        const readableData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(readableData);

        setPastRun(readableData);
      } catch (err) {
        console.error(err);
      }
    };

    getPastRun();
  }, []);

  return (
    <div className="App">
      <Authentication />

      <div>
        {pastRun.map((run) => (
          <div key={run.id}>
            <p>
              date: {run.Date?.toDate().toLocaleDateString()}
            </p>

            <p>
              distance in m: {run.Distance}
            </p>

            <p>
              music: {run.Music}
            </p>

            <p>
              time in s: {run.Time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
import './pastrun.css';
import { database } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import React, { useState, useEffect } from 'react';

function PastRun() {
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
    <div className="pastrun">
      <div>
        {pastRun.map((run) => (
          <div className = "runs" key={run.id}>
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
export default PastRun;
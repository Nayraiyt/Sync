import './pastrun.css';
import { database } from "../../config/firebase.tsx";
import { getDocs, collection } from "firebase/firestore";
import React, { useState, useEffect } from 'react';

type PastRunItem = {
  id: string;
  Date?: { toDate: () => Date };
  Distance?: number | string;
  Music?: string;
  Time?: number | string;
};

function PastRun() {
  const [pastRun, setPastRun] = useState<PastRunItem[]>([]);

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
      <div className = "runs">
        {pastRun.map((run) => (
          <div className = "run" key={run.id}>
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
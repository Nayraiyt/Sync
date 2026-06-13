import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./Past.css";
import { database } from "../../config/firebase";
import { MiniMap } from "./Minimap/Minimap.tsx";

type Props = {
  user: any;
};

type LocationPoint = {
  lat: number;
  lng: number;
};

type Run = {
  id: string;
  distanceKm: number;
  createdAt?: any;
  route?: LocationPoint[];
};

export const Past = ({ user }: Props) => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const runsRef = collection(database, "users", user.uid, "runs");

        const q = query(runsRef, orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Run[];

        console.log("RUNS FROM FIRESTORE:", data);
        console.log("FIRST ROUTE:", data[0]?.route);
        console.log("FIRST POINT:", data[0]?.route?.[0]);

        setRuns(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, [user]);

  if (loading) {
    return (
      <div className="past">
        <h2 className="loadingRuns">Loading Runs...</h2>
      </div>
    );
  }

  return (
    <div className="past">
      <div className="pastRunsContainer">
        <h1 className="pastRunsTitle">Past Runs</h1>

        {runs.length === 0 ? (
          <p className="emptyRuns">No runs saved yet.</p>
        ) : (
          <div className="runsList">
            {runs.map((run) => (
              <div key={run.id} className="runCard">
                {run.route && run.route.length > 0 && (
                  <div className="runCardMap">
                    {/*<MiniMap locations={run.route} />*/}
                    <MiniMap
                        locations={run.route.map((point: any) => ({
                            lat: point.latitude ?? point._lat,
                            lng: point.longitude ?? point._long,
                        }))}
                        />
                  </div>
                )}

                <div className="runCardContent">
                  <div className="runDistance">
                    {run.distanceKm?.toFixed(2)} km
                  </div>

                  <div className="runDate">
                    {run.createdAt?.toDate?.()?.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

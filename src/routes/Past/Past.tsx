import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import "./Past.css";
import { database } from "../../config/firebase";

type Props = {
    user: any;
};

type Run = {
    id: string;
    distanceKm: number;
    createdAt?: any;
};

export const Past = ({ user }: Props) => {
    const [runs, setRuns] = useState<Run[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRuns = async () => {
            try {
                const runsRef = collection(
                    database,
                    "users",
                    user.uid,
                    "runs"
                );

                const q = query(
                    runsRef,
                    orderBy("createdAt", "desc")
                );

                const snapshot = await getDocs(q);

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Run[];

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
        return <h2>Loading Runs...</h2>;
    }

    return (
        <div className="pastRunsContainer">
            <h1 className="pastRunsTitle">Past Runs</h1>

            {runs.length === 0 ? (
                <p className="emptyRuns">
                    No runs saved yet.
                </p>
            ) : (
                <div className="runsList">
                    {runs.map((run) => (
                        <div
                            key={run.id}
                            className="runCard"
                        >
                            <div className="runDistance">
                                {run.distanceKm?.toFixed(2)} km
                            </div>

                            <div className="runDate">
                                {run.createdAt
                                    ?.toDate?.()
                                    ?.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
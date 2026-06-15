import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";

export async function getSongs() {
    const snap = await getDocs(
        collection(database, "songs")
    );

    return snap.docs.map((d) => d.data());
}

export function paceToBPM(paceMinPerKm: number) {
    if (paceMinPerKm > 7) return 145;
    if (paceMinPerKm > 6) return 155;
    if (paceMinPerKm > 5) return 165;
    if (paceMinPerKm > 4) return 175;
    return 185;
}

type Song = {
    bpm: number | null;
    name: string;
    artist: string;
    spotifyTrackId: string;
};

export function matchSongsByBPM(
    songs: Song[],
    targetBPM: number
) {
    return songs
        .filter((s) => s.bpm !== null)
        .sort(
            (a, b) =>
                Math.abs((a.bpm! - targetBPM)) -
                Math.abs((b.bpm! - targetBPM))
        );
}
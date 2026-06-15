import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import type { Song } from "../../../types/song";

export async function getSongs(): Promise<Song[]> {
    const snap = await getDocs(
        collection(database, "songs")
    );

    return snap.docs.map((doc) => {
        const data = doc.data();

        return {
            spotifyTrackId: data.spotifyTrackId,
            name: data.name,
            artist: data.artist,
            bpm: data.bpm ?? null,
            bpmStatus: data.bpmStatus ?? "missing",
            previewUrl: data.previewUrl ?? null,
        };
    });
}
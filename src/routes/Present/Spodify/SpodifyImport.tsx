import { useState } from "react";
import { database } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

type Playlist = {
    id: string;
    name: string;
};


export function SpodifyImporter() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("spotify_token");

    const loadPlaylists = async () => {
        setLoading(true);

        const res = await fetch(
            "https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.error("Spotify error:", data);
            alert("Spotify auth failed — reconnect account");
            return;
        }

        if (!data.items) {
            console.error("No playlists returned:", data);
            return;
        }

        setPlaylists(data.items);
    };

    const importPlaylist = async (playlistId: string) => {
        setLoading(true);

        const res = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        for (const item of data.items) {
            const track = item.track;

            if (!track?.id) continue;

            await setDoc(doc(database, "songs", track.id), {
                spotifyTrackId: track.id,
                name: track.name,
                artist: track.artists
                    .map((a: any) => a.name)
                    .join(", "),
                previewUrl: track.preview_url ?? null,

                bpm: null,
                bpmStatus: "missing",
            });
        }

        setLoading(false);
        alert("Playlist imported!");
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Spotify Playlist Importer</h2>

            <button onClick={loadPlaylists}>
                Load My Playlists
            </button>

            {loading && <p>Loading...</p>}

            <div>
                {playlists.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            marginTop: 10,
                            padding: 10,
                            border: "1px solid #ccc",
                        }}
                    >
                        <p>{p.name}</p>

                        <button
                            onClick={() =>
                                importPlaylist(p.id)
                            }
                        >
                            Import This Playlist
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
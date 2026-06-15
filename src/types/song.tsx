export type Song = {
    spotifyTrackId: string;
    name: string;
    artist: string;
    bpm: number | null;
    bpmStatus: "missing" | "manual" | "estimated" | "verified";
    previewUrl?: string | null;
};
const CLIENT_ID = import.meta.env.VITE_SCID;
const REDIRECT_URI = window.location.origin;

const SCOPES = [
    "playlist-read-private",
    "playlist-read-collaborative",
];

function generateRandomString(length: number) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }
    return result;
}

async function sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: ArrayBuffer) {
    return btoa(
        String.fromCharCode(...new Uint8Array(a))
    )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export async function loginWithSpotify() {
    const codeVerifier = generateRandomString(128);

    const hashed = await sha256(codeVerifier);
    const codeChallenge =
        base64urlencode(hashed);

    localStorage.setItem(
        "code_verifier",
        codeVerifier
    );

    const authUrl =
        `https://accounts.spotify.com/authorize` +
        `?client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}` +
        `&scope=${encodeURIComponent(
            SCOPES.join(" ")
        )}` +
        `&code_challenge_method=S256` +
        `&code_challenge=${codeChallenge}`;

    window.location.href = authUrl;
}
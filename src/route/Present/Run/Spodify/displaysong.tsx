import React, { useEffect } from 'react';

function DisplaySong(){
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
        const token = (window as any).REACT_APP_SPOTIFY_ACCESS_TOKEN || '';

        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            // @ts-ignore
            document.getElementById('togglePlay').onclick = function() {
                player.togglePlay();
            };
            const player = new (window as any).Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: (cb: (arg0: any) => void) => { cb(token); },
                volume: 0.5
            });
            player.connect();
        };
        return () => {
            document.body.removeChild(script);
            // @ts-ignore
            delete window.onSpotifyWebPlaybackSDKReady;
        };
    }, []);
    return(
        <div className="display">
            <button id="togglePlay">Toggle Play</button>
        </div>
    )
}

export default DisplaySong;
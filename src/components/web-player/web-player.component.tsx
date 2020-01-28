import React, { useEffect } from "react";
import { environment } from "../../environment/environment";

interface Props {}

declare global {
    interface Window { onSpotifyWebPlaybackSDKReady: any; }
}

window.onSpotifyWebPlaybackSDKReady = window.onSpotifyWebPlaybackSDKReady || {};


export const WebPlayerComponent: React.FC<Props> = () => {

  useEffect(() => {
    // loadWebPlayer().then((result)=>{
    //     window.onSpotifyWebPlaybackSDKReady = () => {
    //         const token = environment.API_token
    //         const player = new Spotify.Player({
    //           name: 'Web Playback SDK Quick Start Player',
    //           getOAuthToken: cb => { cb(token); }
    //         });
    //     }
    // })
  }, []);

const loadWebPlayer = () => {
   return new Promise(function(resolve, reject){
        var script = document.createElement('script');
        script.src =  "https://sdk.scdn.co/spotify-player.js";
        script.addEventListener('load', function () {
          resolve();
        });
        script.addEventListener('error', function (e) {
          reject(e);
        });
        document.body.appendChild(script);
      })
}
  return <div>WebPlayerComponent</div>;
};

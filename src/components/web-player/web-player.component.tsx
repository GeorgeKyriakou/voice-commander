import React, { useEffect, useContext, useState } from "react";

import AuthContext from "../../context/auth/auth.context";
import { ContextPreviewComponent } from "./context-preview/preview.component";
import WebPlayerState from "../../context/web-player/player.state";
import { ControllsComponent } from "./player-controlls/controlls.component";

import {WebPlayer} from './web-player.style';
interface Props {}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: Function;
    Spotify: any;
  }
}

window.onSpotifyWebPlaybackSDKReady = window.onSpotifyWebPlaybackSDKReady || {};

export const WebPlayerComponent: React.FC<Props> = () => {
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  const initializePlayer = (player: any) => {
    player.addListener("initialization_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("authentication_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("account_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("playback_error", (res: any) =>
      console.error(res.message)
    );
    player.addListener("player_state_changed", (state: any) =>
      console.log(state)
    );
    player.addListener("ready", (p: any) =>
      console.log("Ready with Device ID", p.device_id)
    );
    player.addListener("not_ready", (p: any) =>
      console.log("Device ID has gone offline", p.device_id)
    );

    player.connect().then((success: any) => {
      if (success) setPlayerLoaded(true);
    });
  };

  useEffect(() => {
    loadWebPlayer().then(
      success => {
        if (success) {
          window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
              name: "Web Playback SDK Quick Start Player",
              getOAuthToken: (cb: any) => {
                cb(token);
              }
            });
            initializePlayer(player);
          };
        }
      },
      error => {
        console.error({ error });
      }
    );
  }, [token]);

  const loadWebPlayer = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const tick = new Date().getMilliseconds();
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.addEventListener("load", () => {
        const tock = new Date().getMilliseconds();
        console.log("Time taken to load spotify script", tock - tick);
        resolve(true);
      });
      script.addEventListener("error", e => {
        reject(e);
      });
      document.body.appendChild(script);
    });
  };

  return (
    <WebPlayerState>
      <WebPlayer>
      {playerLoaded ? <>
        <ContextPreviewComponent />
        <ControllsComponent/>
      </> : <div>Loading...</div>}
      </WebPlayer>
    </WebPlayerState>
  );
};

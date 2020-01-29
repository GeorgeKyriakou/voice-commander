import React, { useReducer } from "react";

import { Observable, Observer } from "rxjs";
import axios from "axios";
import PlayerContext from "./player.context";
import * as playerActions from "./player.actions";
import { playerReducer } from "./player.reducer";
import { Track, PlayerInterface, CurrentContext } from "./player.model";
import { environment } from "../../environment/environment";
import axiosInstance from "../../utils/axiosInstance";

const WebPlayerState = (props: any) => {
  const initialState = {
    isLoading: false,
    device: "",
    repeat_state: "",
    shuffle_state: false,
    context: null,
    item: {} as Track,
    timestamp: 0,
    currently_playing_type: "",
    actions: null,
    progress_ms: 0,
    getCurrentTrack: async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      try {
        const res = await axios.get(
          `${environment.baseAPIUrl}/v1/me/player`,
          options
        );
        dispatch({
          type: playerActions.GET_PLAYING_CURRENTLY_SUCCESS,
          payload: res.data
        });
      } catch (error) {
        dispatch({
          type: playerActions.GET_PLAYING_CURRENTLY_FAILURE
        });
      }
    }
  } as PlayerInterface;

  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        device: state.device,
        repeat_state: state.repeat_state,
        shuffle_state: state.shuffle_state,
        context: state.context,
        item: state.item,
        timestamp: state.timestamp,
        currently_playing_type: state.currently_playing_type,
        actions: state.actions,
        progress_ms: state.progress_ms,
        getCurrentTrack: state.getCurrentTrack
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default WebPlayerState;

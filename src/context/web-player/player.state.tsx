import React, { useReducer } from "react";

import PlayerContext from "./player.context";
import * as playerActions from "./player.actions";
import { playerReducer } from "./player.reducer";
import { Track, PlayerInterface } from "./player.model";
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
    contentPlaying: false,
    getCurrentTrack: async () => {
      try {
        const res = await axiosInstance.get(
          `${environment.baseAPIUrl}/v1/me/player/currently-playing`
        );
        dispatch({
          type: playerActions.GET_PLAYING_CURRENTLY_SUCCESS,
          payload: res.data? res.data.item: null
        });
      } catch (error) {
        dispatch({
          type: playerActions.GET_PLAYING_CURRENTLY_FAILURE
        });
      }
    },
    pausePlayback: async () => {
      try {
        await axiosInstance.put(`${environment.baseAPIUrl}/v1/me/player/pause`);
        dispatch({
          type: playerActions.PAUSE_CURRENT_TRACK_SUCCESS
        });
      } catch (error) {
        dispatch({
          type: playerActions.PAUSE_CURRENT_TRACK_FAILURE
        });
      }
    },
    resumePlayback: async () => {
      try {
        await axiosInstance.put(`${environment.baseAPIUrl}/v1/me/player/play`);
        dispatch({
          type: playerActions.RESUME_PLAY_SUCCESS
        });
      } catch (error) {
        dispatch({
          type: playerActions.RESUME_PLAY_FAILURE
        });
      }
    },
    playNext: async () => {
      try {
        await axiosInstance.post(`${environment.baseAPIUrl}/v1/me/player/next`);
        dispatch({
          type: playerActions.PLAY_NEXT_SUCCESS
        });
        state.getCurrentTrack()
      } catch (error) {
        dispatch({
          type: playerActions.PLAY_NEXT_FAILURE
        });
      }
    },
    playPrevious: async () => {
      try {
        await axiosInstance.post(
          `${environment.baseAPIUrl}/v1/me/player/previous`
        );
        dispatch({
          type: playerActions.PLAY_PREVIOUS_SUCCESS
        });
        state.getCurrentTrack()
      } catch (error) {
        dispatch({
          type: playerActions.PLAY_PREVIOUS_FAILURE
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
        getCurrentTrack: state.getCurrentTrack,
        contentPlaying: state.contentPlaying,
        pausePlayback: state.pausePlayback,
        resumePlayback: state.resumePlayback,
        playNext: state.playNext,
        playPrevious: state.playPrevious
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default WebPlayerState;

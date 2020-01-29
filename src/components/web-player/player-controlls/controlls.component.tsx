import React, { useContext, useState } from "react";
import { Controlls } from "./controlls.style";
import PlayerContext from "../../../context/web-player/player.context";

interface Props {}

export const ControllsComponent: React.FC<Props> = () => {
  const playerContext = useContext(PlayerContext);
  const { contentPlaying, pausePlayback, resumePlayback, playNext,playPrevious } = playerContext;
  const [playing, setPlaying] = useState(contentPlaying);
  
 
  const handleOnPrevious = () => {
    playPrevious()
  };

  const handleOnPauseResume = () => {
    if(playing) {
        pausePlayback()
    } else {
        resumePlayback()
    }
    setPlaying(!playing) 
  };

  const handleOnNext = () => {
    playNext()
  };
  return (
    <Controlls>
      <button type="button" onClick={handleOnPrevious}>
        Previous
      </button>
      <button type="button" onClick={handleOnPauseResume}>
        {playing? "Pause":"Resume"}
      </button>
      <button type="button" onClick={handleOnNext}>
        Next
      </button>
    </Controlls>
  );
};

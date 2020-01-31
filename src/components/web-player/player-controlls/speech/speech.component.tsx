import React, { useEffect, useState, useContext } from "react";

import microphone from "../../../../assets/microphone.svg";
import PlayerContext from "../../../../context/web-player/player.context";
import { VoiceControlls } from "./speech.style";

declare global {
  interface Window {
    webkitSpeechRecognition: Function;
  }
}
interface Props {}

export const SpeechComponent: React.FC<Props> = () => {
  const playerContext = useContext(PlayerContext);
  const {
    pausePlayback,
    resumePlayback,
    playNext,
    playPrevious
  } = playerContext;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const listen = new SpeechRecognition();

  const [speechAlert, setSpeechAlert] = useState("");

  useEffect(() => {
    listen.continuous = true;
    listen.start();
  }, []);

  const executeVoiceCommand = (command:any)=>{
    setSpeechAlert("");    
    switch (command.toLowerCase().trim()) {
      case "play":
        resumePlayback();
        break;
      case "pause":
        pausePlayback();
        break;
      case "next":
        playNext();
        break;
      case "back":
        playPrevious();
        break;
      default:
        setSpeechAlert("I didn't quite get that");
        break;
    }
  }

  listen.onstart = _ => console.log("listening...");
  listen.onresult = e => {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    executeVoiceCommand(transcript);
  };

  return (
    <VoiceControlls>
      {speechAlert && <h5>{speechAlert}</h5>}
      <img src={microphone} width="45" height="45" alt="microphone" />
      <h6>play | pause | next | back</h6>
    </VoiceControlls>
  );
};

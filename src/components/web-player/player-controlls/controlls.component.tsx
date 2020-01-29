import React, { useContext, useState, useEffect } from "react";
import { Controlls } from "./controlls.style";
import PlayerContext from "../../../context/web-player/player.context";

import back from "../../../assets/back.svg";
import pause from "../../../assets/pause.svg";
import play from "../../../assets/play.svg";
import next from "../../../assets/next.svg";

interface Props {}

export const ControllsComponent: React.FC<Props> = () => {
  const playerContext = useContext(PlayerContext);
  const {
    contentPlaying,
    pausePlayback,
    resumePlayback,
    playNext,
    playPrevious,
    item
  } = playerContext;
  const [playing, setPlaying] = useState(contentPlaying);

  useEffect(() => {
    Object.keys(item).length > 0 ? setPlaying(true) : setPlaying(false);
  }, [item]);

  const handleOnPrevious = () => {
    playPrevious();
  };

  const handleOnPauseResume = () => {
    if (playing) {
      pausePlayback();
    } else {
      resumePlayback();
    }
    setPlaying(!playing);
  };

  const handleOnNext = () => {
    playNext();
  };

  return (
    <>
       <Controlls>
    <div className="album-spotlight">
      {
item.album &&
        <img
        src={item.album.images.find((img: any) => img.height === 640).url}
        alt=""
        />
      }
    </div>
   
      <div className="controls">
      <div onClick={handleOnPrevious}>
          <img src={back} />
        </div>
        <div onClick={handleOnPauseResume}>
          <img src={playing ? pause : play} />
        </div>
        <div onClick={handleOnNext}>
          <img src={next} />
        </div>
      </div>
      </Controlls>
    </>
  );
};

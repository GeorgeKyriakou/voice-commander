import React, { useContext, useEffect, useState } from "react";
import PlayerContext from "../../../context/web-player/player.context";
interface Props {}

export const ContextPreviewComponent: React.FC<Props> = () => {
    const playerContext = useContext(PlayerContext);
    const { item, getCurrentTrack } = playerContext;
    const [currentSong, setCurrentSong] = useState(item)

    useEffect(() => {
        getCurrentTrack()
    setCurrentSong(item)
  }, []);

  return <div>CONTEXT: currentSong {JSON.stringify(currentSong)}</div>;
};

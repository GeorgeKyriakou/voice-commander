import React, { useContext, useEffect, useState } from "react";
import PlayerContext from "../../../context/web-player/player.context";
import { Preview } from "./preview.style";
interface Props {}

export const ContextPreviewComponent: React.FC<Props> = () => {
  const playerContext = useContext(PlayerContext);
  const { item, getCurrentTrack } = playerContext;
  const [currentSong, setCurrentSong] = useState(item);

  useEffect(() => {
    getCurrentTrack();
  }, []);

  useEffect(() => {
    setCurrentSong(item);
  }, [item]);

  return (
    <Preview>
      {item.artists && (
        <div className="primary-info">
          <div className="song">
            Now playing: <h5>{JSON.stringify(currentSong.name)}</h5>
          </div>
          <div>
            <div className="artist">
              Artist:{" "}
              {React.Children.toArray(
                item.artists.map(artist => <h5>{artist.name}</h5>)
              )}
            </div>
          </div>
        </div>
      )}
      <div className="album-cover">
        {item.album && (
          <img
            src={item.album.images.find((img: any) => img.height === 64).url}
            alt=""
          />
        )}
      </div>
    </Preview>
  );
};

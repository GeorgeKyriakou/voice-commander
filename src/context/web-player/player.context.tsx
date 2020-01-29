import { createContext } from "react";
import { PlayerInterface } from "./player.model";


const PlayerContext = createContext({} as PlayerInterface);

export default PlayerContext;

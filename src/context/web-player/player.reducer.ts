import * as playerActions from "./player.actions";
import { PlayerInterface } from "./player.model";


export const playerReducer = (state: PlayerInterface, action: any) => {
  switch (action.type) {
    case playerActions.SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
      case playerActions.GET_PLAYING_CURRENTLY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          // item: action.payload.context.data.item 
        };
    default:
      return state;
  }
};

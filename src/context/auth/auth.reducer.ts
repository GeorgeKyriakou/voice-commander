import * as authActions from "./auth.actions";
import { AuthInterface } from "./auth.models";

export default (state: AuthInterface, action: any) => {
  switch (action.type) {
    case authActions.AUTHENTICATE:
      return {
        ...state,
        isLoading: true
      };
    case authActions.AUTHENTICATE_SUCCESS:      
      return {
        ...state,
        token: action.payload.accessToken,
        isAuthenticated: true,
        isLoading: false
      };
    case authActions.AUTHENTICATE_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };

    case authActions.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
};

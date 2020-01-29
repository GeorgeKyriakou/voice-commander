import * as authActions from "./auth.actions";
import { AuthInterface } from "./auth.model";

export default (state: AuthInterface, action: any) => {
  switch (action.type) {
    case authActions.AUTHENTICATE:
      return {
        ...state,
        isLoading: true
      };
    case authActions.AUTHENTICATE_SUCCESS:      
      sessionStorage.setItem("accessToken", action.payload);
      sessionStorage.setItem("grantedOn", `${new Date().getTime()}`);
      return {
        ...state,
        token: action.payload,
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
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("grantedOn");
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

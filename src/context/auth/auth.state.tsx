import React, { useReducer } from "react";

import authReducer from "./auth.reducer";
import * as authActions from "./auth.actions";
import AuthContext from "./auth.context";
import { environment } from "../../environment/environment";

const AuthState = (props: any) => {
  const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: "",
    token: "",
    login: () => {},
    loginSuccess: () => {},
    loginFailed: () => {},
    logout: () => {},
    checkAuthenticated: () => {}
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () => {
    if (!state.isAuthenticated) {
      dispatch({ type: authActions.AUTHENTICATE });
      const scopes =
        "user-modify-playback-state user-read-playback-state streaming user-read-email user-read-private";
      const client_id = "e222016a7b824d779c374b4c87687ddd";
      const redirect_uri = environment.redirectURL;
      window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(
        scopes
      )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    }
  };

  const loginSuccess = (accessToken: string) =>
    dispatch({
      type: authActions.AUTHENTICATE_SUCCESS,
      payload: accessToken
    });

  const loginFailed = () =>
    dispatch({
      type: authActions.AUTHENTICATE_FAILURE
    });

  const logout = () => dispatch({ type: authActions.LOGOUT_SUCCESS });
  const checkAuthenticated = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const grantedOn = +sessionStorage.getItem("grantedOn")!;
    const anHourInTheFuture = new Date().getTime();
    const hasExpired =
      Math.abs(grantedOn - anHourInTheFuture) / 1000 / 3600 > 1;

    if (!!accessToken && !hasExpired) {
      dispatch({
        type: authActions.AUTHENTICATE_SUCCESS,
        payload: accessToken
      });
    } else {
      logout();
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        isLoading: state.isLoading,
        login,
        logout,
        checkAuthenticated,
        loginSuccess,
        loginFailed
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

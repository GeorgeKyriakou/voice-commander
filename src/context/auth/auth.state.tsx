import React, { useReducer } from "react";

import { Observable, Observer } from "rxjs";
import axios from "axios";

import authReducer from "./auth.reducer";
import * as authActions from "./auth.actions";
import AuthContext from "./auth.context";

declare global {
  interface Date {
    addHours(h: number): Date;
  }
}

Date.prototype.addHours = function(h: number) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const AuthState = (props: any) => {
  const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: "",
    token: "",
    login: () => {
      if (!state.isAuthenticated) {
        dispatch({ type: authActions.AUTHENTICATE });
        const scopes =
          "user-modify-playback-state user-read-playback-state streaming user-read-email user-read-private";
        const client_id = "e222016a7b824d779c374b4c87687ddd";
        const redirect_uri = "http://localhost:3000/callback";
        window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(
          scopes
        )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
      }
    },
    loginSuccess: (accessToken: string) => {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("grantedOn", `${new Date().getTime()}`);
      dispatch({
        type: authActions.AUTHENTICATE_SUCCESS,
        payload: accessToken
      });
    },
    loginFailed: () => {
      dispatch({
        type: authActions.AUTHENTICATE_FAILURE
      });
    },
    logout: () => {
      sessionStorage.removeItem("accessToken");
      dispatch({ type: authActions.LOGOUT_SUCCESS });
    },
    checkAuthenticated: () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const grantedOn = +sessionStorage.getItem("grantedOn")!;
      const anHourInTheFuture = new Date().getTime();
      const hasExpired = (Math.abs(grantedOn - anHourInTheFuture)/1000)/3600 > 1

      if (accessToken && !hasExpired) {        
        dispatch({
          type: authActions.AUTHENTICATE_SUCCESS,
          payload: { accessToken }
        });
      } else {
        state.logout()
      }
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={
        {
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          token: state.token,
          isLoading: state.isLoading,
          login: state.login,
          logout: state.logout,
          checkAuthenticated: state.checkAuthenticated,
          loginSuccess: state.loginSuccess,
          loginFailed: state.loginFailed
        }
      }
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

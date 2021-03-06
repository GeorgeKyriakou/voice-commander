import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/auth.context";

interface Props {}

export const CallbackComponent: React.FC<Props> = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loginSuccess, loginFailed, token } = authContext;

  useEffect(() => {
    if (!token) {
      const hash = window.location.hash;
      const access_token = parseHash(`${hash}`);                  
      if (access_token) {
        loginSuccess(access_token);
      } else {
        loginFailed();
      }
    }
  }, [loginSuccess, loginFailed, token]);

  const parseHash = (hash: string) => {
    /* eslint-disable */
    return hash.match(/\#(?:access_token)\=([\S\s]*?)\&/)![1];
    /* eslint-enable */
  };

  if (isAuthenticated) {
    return <div>Authenticated!!</div>;
  } else {
    return <div>Something went wrong</div>;
  }
};

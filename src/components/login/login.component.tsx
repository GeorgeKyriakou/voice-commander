import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/auth.context";

interface Props {
  token: string;
}

export const LoginComponent: React.FC<Props> = () => {
  const { login, token, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    console.log({token, isAuthenticated});
    if (!token) {
      login();
    }
  }, [token]);

return <>{token}</>;
};

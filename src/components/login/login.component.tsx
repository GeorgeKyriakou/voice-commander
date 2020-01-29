import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/auth.context";

interface Props {
  token: string;
}

export const LoginComponent: React.FC<Props> = () => {
  const { login, token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      login();
    }
  }, [token, login]);

return <></>;
};

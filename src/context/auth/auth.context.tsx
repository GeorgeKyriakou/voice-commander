import { createContext } from "react";
import { AuthInterface } from "./auth.models";


const AuthContext = createContext({} as AuthInterface);

export default AuthContext;

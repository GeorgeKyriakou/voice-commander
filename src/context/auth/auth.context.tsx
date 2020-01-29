import { createContext } from "react";
import { AuthInterface } from "./auth.model";


const AuthContext = createContext({} as AuthInterface);

export default AuthContext;

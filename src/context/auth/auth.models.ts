export interface AuthInterface {
    isLoading:boolean;
    isAuthenticated: boolean;
    user: string;
    token: string;
    login: Function;
    loginSuccess: Function;
    loginFailed: Function;
    logout: Function;
    checkAuthenticated: Function;
  }

  export interface IUserAuthenticate {
      email:string;
      password?:string;
  }
  
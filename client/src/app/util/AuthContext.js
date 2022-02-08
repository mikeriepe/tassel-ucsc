import { createContext } from "react";

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {}
});

export default AuthContext;
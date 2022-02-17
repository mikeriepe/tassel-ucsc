import React, {useContext, createContext, useState} from 'react';

// initializes context
const AuthContext = createContext();

/**
 * component that provides authcontext
 * @param {*} props things passed in
 * @return {JSX} auth provider for auth context
 */
export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  return (
    <AuthContext.Provider
      value={{user,
        setUser,
        loggedIn,
        setLoggedIn,
        userProfile,
        setUserProfile}}>
      {props.children}
    </AuthContext.Provider>
  );
}

/**
 * allows other components to use auth
 * @return {context} user
 */
export default function useAuth() {
  return useContext(AuthContext);
}

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
  const [joinedOpportunities, setJoinedOpportunities] = useState(null);
  const [createdOpportunities,
    setCreatedOpportunities] = useState(null);
  const [pendingOpportunities,
    setPendingOpportunities] = useState(null);
  const [pastOpportunities,
    setPastOpportunities] = useState(null);

  return (
    <AuthContext.Provider
      value={{user,
        setUser,
        loggedIn,
        setLoggedIn,
        userProfile,
        setUserProfile,
        joinedOpportunities,
        setJoinedOpportunities,
        createdOpportunities,
        setCreatedOpportunities,
        pendingOpportunities,
        setPendingOpportunities,
        pastOpportunities,
        setPastOpportunities,
      }}>
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

import React, {useContext, createContext, useState, useEffect} from 'react';

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

  useEffect(()=>{
    fetch(`/api/verifyUserSession`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
        .then((res)=> {
          // Check if the response code is OK or not
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json)=>{
          // Set the user to be logged in and set user data and user profile
          setUser(json.user);
          setLoggedIn(true);
          setUserProfile(json.profile);
        })
        .catch( () =>{
          console.log('No JWT Detected');
        });
  }, []);

  return (
    <AuthContext.Provider
      value={{user,
        setUser,
        loggedIn,
        setLoggedIn,
        userProfile,
        setUserProfile,
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

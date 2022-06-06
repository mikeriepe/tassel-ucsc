import React, {useContext, createContext, useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from '@mui/material/Box';

// initializes context
const AuthContext = createContext();

const Progress = () => (
  <MuiBox
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <CircularProgress />
  </MuiBox>
);

/**
 * component that provides authcontext
 * @param {*} props things passed in
 * @return {JSX} auth provider for auth context
 */
export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
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
          setLoading(false);
        })
        .catch( () =>{
          setLoading(false);
          console.log('No JWT Detected');
        });
  }, []);

  return (
    <>
      {loading ? <Progress /> : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            loggedIn,
            setLoggedIn,
            userProfile,
            setUserProfile,
          }}
        >
          {props.children}
        </AuthContext.Provider>
      )}
    </>
  );
}

/**
 * allows other components to use auth
 * @return {context} user
 */
export default function useAuth() {
  return useContext(AuthContext);
}

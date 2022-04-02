import * as React from 'react';
import '../stylesheets/Landing.css';

import useAuth from '../util/AuthContext';
/**
 * creates landing page
 * @return {HTML} Landing page
 */
export default function Landing() {
  // Import the states from authcontext
  const {setUser, setLoggedIn, setUserProfile} = useAuth();

  const authTest = () => {
    fetch(`/api/dummy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };


  // Checks if there's a user that logged in each time the APP loads
  React.useEffect(()=>{
    fetch(`/api/userVerifySession`, {
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
          // Set the user to be logged in and set user data
          setUser(json);
          setLoggedIn(true);
          fetch(`/api/getProfile/${json.userid}`)
              .then((res) => {
                if (!res.ok) {
                  throw res;
                }
                return res.json();
              })
              .then((json) => {
                console.log(json);
                setUserProfile(json);
              })
              .catch((err) => {
                console.log(err);
                alert('Error retrieving profile, please try again');
              });
        })
        .catch( () =>{
          console.log('No JWT Detected');
        });
  }, []);

  return (
    <div className='Landing'>
      <div className='title'>
        <h1 className='ACmmTitle'>AC Match Maker</h1>
        <h2 className='secondaryTitle'>connect students with alumni</h2>
        <button
          className="LoginPage__submitButton"
          onClick={authTest}
          // hidden={true}
        >
          Test Auth
        </button>
      </div>
    </div>
  );
}

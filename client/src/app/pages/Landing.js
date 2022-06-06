import * as React from 'react';
import '../stylesheets/Landing.css';

// import useAuth from '../util/AuthContext';
/**
 * creates landing page
 * @return {HTML} Landing page
 */
export default function Landing() {
  const authTest = () => {
    fetch(`/api/dummy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // const getTest = () => {
  //   fetch(`/api/getRoles/c6feb949-9ea4-4a65-9e36-8acc9fac151d`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((res) => {
  //     if (!res.ok) {
  //       throw res;
  //     }
  //     return res.json();
  //   }).then((json) => {
  //     console.log(json);
  //   });
  // };

  return (
    <div className='Landing'>
      <div className='title'>
        <h1 className='ACmmTitle' id='landingTitle'>AC Match Maker</h1>
        <h2 className='secondaryTitle'>connect students with alumni</h2>
        <button
          className="LoginPage__submitButton"
          onClick={authTest}
          hidden={true}
        >
          Test
        </button>
      </div>
    </div>
  );
}

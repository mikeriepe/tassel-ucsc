import * as React from 'react';

import useAuth from '../util/AuthContext';
/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function Profile() {
  const {user} = useAuth();

  return (
    <div className='Profile'>
      <h1>Profile</h1>
      <p>{user.useremail}</p>
    </div>
  );
}

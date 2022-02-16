import * as React from 'react';
import '../stylesheets/MyProfile.css';
import Profile from '../components/Profile';
import Events from '../components/Events';
import Calendar from '../components/Calendar';
import useAuth from '../util/AuthContext';

/**
 * creates the profile page
 * @return {HTML} my profile page
 */
export default function MyProfile() {
  const {user} = useAuth();

  return (
    <div className='MyProfile'>
      <h1>
        {user.useremail}
      </h1>
      <Profile />
      <Events />
      <Calendar />
    </div>
  );
}

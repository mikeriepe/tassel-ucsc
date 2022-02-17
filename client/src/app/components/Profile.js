import * as React from 'react';

import useAuth from '../util/AuthContext';
import ProfileHeader from '../components/ProfileHeader';
import ProfileAbout from '../components/ProfileAbout';
import ProfileWork from '../components/ProfileWork';
import ProfileVolunteer from '../components/ProfileVolunteer';

/**
 * creates Calendar
 * @return {HTML} Calendar component
 */
export default function Profile() {
  const {user} = useAuth();
  return (
    <div
      className='profile-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ProfileHeader data={user.useremail} />
      <ProfileAbout />
      <ProfileWork />
      <ProfileVolunteer />
    </div>
  );
}

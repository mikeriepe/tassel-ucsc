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
  const {userProfile} = useAuth();
  return (
    <div
      className='profile-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ProfileHeader data={userProfile} />
      <ProfileAbout data={userProfile.about} />
      <ProfileWork data={userProfile.experience} />
      <ProfileVolunteer data={userProfile.volunteeringexperience} />
    </div>
  );
}

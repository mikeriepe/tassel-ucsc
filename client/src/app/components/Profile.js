import * as React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileAbout from '../components/ProfileAbout';
import ProfileWork from '../components/ProfileWork';
import ProfileVolunteer from '../components/ProfileVolunteer';

/**
 * creates Calendar
 * @return {HTML} Calendar component
 */
export default function Profile() {
  const exampleData = 'Rebecca Rogers';

  return (
    <div
      className='profile-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ProfileHeader data={exampleData} />
      <ProfileAbout />
      <ProfileWork />
      <ProfileVolunteer />
    </div>
  );
}

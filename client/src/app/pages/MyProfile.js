import * as React from 'react';
import TabBar from '../components/TabBar';

/**
 * creates the profile page
 * @return {HTML} my profile page
 */
export default function MyProfile() {
  return (
    <div className='MyProfile'>
      <h1>My Profile</h1>
      <TabBar />
    </div>
  );
}

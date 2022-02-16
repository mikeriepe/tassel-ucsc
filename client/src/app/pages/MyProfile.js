import * as React from 'react';
import '../stylesheets/MyProfile.css';
import TabBar from '../components/TabBar';
import {Route, Routes} from 'react-router-dom';
import Profile from '../components/Profile';
import Events from '../components/Events';
import Calendar from '../components/Calendar';
/**
 * creates the profile page
 * @return {HTML} my profile page
 */
export default function MyProfile() {
  return (
    <div className='MyProfile'>
      <h1>My Profile</h1>
      <TabBar />
      <Routes>
        <Route path="/myprofile" element={<MyProfile/>} />
        <Route path="/myprofile/profile" element={<Profile/>} />
        <Route path="/myprofile/events" element={<Events/>} />
        <Route path="/myprofile/calendar" element={<Calendar/>} />
      </Routes>
    </div>
  );
}

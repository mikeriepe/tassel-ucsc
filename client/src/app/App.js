import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import useAuth from './util/AuthContext';
import NavBarLoggedIn from './components/NavBarLoggedIn';
import NavBarLoggedOut from './components/NavBarLoggedOut';
import Landing from './pages/Landing';
import MyProfile from './pages/MyProfile';
// import Opportunities from './pages/Opportunities';
import Dashboard from './pages/Dashboard';
import Opportunity from './pages/Opportunity';
import Profile from './components/Profile';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheets/App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Verify from './components/Verify';

// TODO: delete browse page
import Browse from './pages/Browse';
// TODO: settings page?
import Settings from './pages/Settings';
import Box from '@mui/material/Box';
import {DrawerHeader} from './components/NavBarComponents';

import ViewOpportunity from './pages/ViewOpportunity';

/**
 * returns basic routes and navbar of app
 * @return {HTML} App component
 */
export default function App() {
  const {userProfile} = useAuth();
  console.log(userProfile);
  return (
    <Box sx={{display: 'flex'}}>
      <ToastContainer />
      {userProfile !== null ? <NavBarLoggedIn/> : <NavBarLoggedOut/>}
      <Box component='main' sx={{flexGrow: 1, p: 3, padding: 0}}>
        <DrawerHeader />
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          {/* <Route path='/opportunities' element={<Opportunities/>}/> */}
          <Route path='/opportunity/:opportunityid' element={<Opportunity/>}/>
          <Route path='/profile/:profileid' element={<Profile />} />
          {/* TODO: delete browse page */}
          <Route path='/browse' element={<Browse />}/>
          {/* TODO: settings page? */}
          <Route path='/settings' element={<Settings />}/>

          <Route path='/opportunities' element={<ViewOpportunity />}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/:token' element={<Verify />} />
        </Routes>
      </Box>
    </Box>
  );
}

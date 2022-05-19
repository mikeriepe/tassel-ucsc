import React from 'react';
import {Route, Routes} from 'react-router-dom';
import useAuth from './util/AuthContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheets/App.css';
import NavBarLoggedIn from './components/NavBarLoggedIn';
import NavBarLoggedOut from './components/NavBarLoggedOut';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Opportunities from './pages/Opportunities';
import Dashboard from './pages/Dashboard';
import Opportunity from './pages/Opportunity';
import Profile from './components/Profile';
// TODO: delete browse page
import Browse from './pages/Browse';
// TODO: settings page?
import Settings from './pages/Settings';
import Box from '@mui/material/Box';
import {DrawerHeader} from './components/NavBarComponents';
import Verify from './components/Verify';
import OpportunityCreation from './components/OpportunityCreation';

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
      <Box component="main" sx={{flexGrow: 1, p: 3, padding: 0}}>
        <DrawerHeader />
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<GetStarted />}/>
          <Route path='/verify/:token' element={<Verify />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/opportunities' element={<Opportunities/>}/>
          <Route path='/opportunity/:opportunityid'
            element={<Opportunity/>}/>
          <Route path='/profile/:profileid' element={<Profile />} />
          {/* TODO: delete browse page */}
          <Route path='/browse' element={<Browse />}/>
          {/* TODO: settings page? */}
          <Route path='/settings' element={<Settings />}/>
        </Routes>
      </Box>
    </Box>
  );
}

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Box from '@mui/material/Box';
import Landing from './pages/Landing';
import MyProfile from './pages/MyProfile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Verify from './components/Verify';
import NavBarLoggedOut from './components/NavBarLoggedOut';
import NavBarLoggedIn from './components/NavBarLoggedIn';
import Dashboard from './pages/Dashboard';
import Approvals from './pages/Approvals';
import Opportunities from './pages/Opportunities';
import Settings from './pages/Settings';
import UpdateProfile from './pages/UpdateProfile';
import ViewOpportunity from './pages/ViewOpportunity';
import ViewProfile from './pages/ViewProfile';
import Browse from './pages/_OLD_Browse';
import useAuth from './util/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheets/App.css';

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
      {userProfile !== null ? <NavBarLoggedIn /> : <NavBarLoggedOut/>}
      <Box component='main' sx={{flexGrow: 1, marginTop: '70px'}}>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/myprofile' element={<MyProfile />} />

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/:token' element={<Verify />} />

          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/approvals' element={<Approvals/>}/>
          <Route path='/opportunities' element={<Opportunities/>}/>
          <Route path='/settings' element={<Settings />}/>

          <Route
            path='/opportunity/:opportunityid'
            element={<ViewOpportunity />}
          />
          <Route path='/profile/:profileid' element={<ViewProfile />} />
          <Route path='/updateprofile' element={<UpdateProfile />} />

          {/* Reimplemented - This is still here for reference */}
          <Route path='/browse' element={<Browse />}/>
        </Routes>
      </Box>
    </Box>
  );
}

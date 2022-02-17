import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheets/App.css';

import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Browse from './pages/Browse';

import {AuthProvider} from './util/AuthContext';

/**
 * returns basic routes and navbar of app
 * @return {HTML} App component
 */
export default function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/getstarted' element={<GetStarted />}/>
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/browse' element={<Browse />}/>
      </Routes>
    </AuthProvider>
  );
}

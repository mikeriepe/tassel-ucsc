import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './stylesheets/App.css';

import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Browse from './pages/Browse';

/**
 * returns basic routes and navbar of app
 * @return {HTML} App component
 */
export default function App() {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/login' component={Login}/>
        <Route expact path='/getstarted' component={GetStarted}/>
        <Route expact path='/myprofile' component={MyProfile}/>
        <Route expact path='/browse' component={Browse}/>
      </Switch>
    </div>
  );
}

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import NavBar from './NavBar';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' component={Login}/>
          <Route expact path='/getstarted' component={GetStarted}/>
        </Switch>
      </div>
    );
  }
}

export default App;
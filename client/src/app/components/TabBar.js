import React from 'react';
import {Tabs, Tab} from '@mui/material';
import {Link} from 'react-router-dom';
// import Profile from './Profile';
// import Events from './Events';
// import Calendar from './Calendar';
/**
 * creates tab bar
 * @return {HTML} tab bar component
 */
export default function TabBar() {
  return (
    <div>
      <Tabs>
        {/* // value={
        //   history.location.pathname !='/' ? history.location.pathname: false
        // } */}
        <Tab
          label="Profile"
          value={'/profile'}
          component={Link}
          to={'/myprofile/profile'}
        />
        <Tab
          label="Events"
          value={'/events'}
          component={Link}
          to={'/myprofile/events'}
        />
        <Tab
          label="Calendar"
          value={'/calendar'}
          component={Link}
          to={'/myprofile/calendar'}
        />
      </Tabs>
    </div>
  );
}

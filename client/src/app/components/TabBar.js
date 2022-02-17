import React from 'react';
import {Tabs, Tab} from '@mui/material';
import Profile from './Profile';
import Events from './Events';
import Calendar from './Calendar';
/**
 * creates tab bar
 * @return {HTML} tab bar component
 */
export default function TabBar() {
  const [value, setValue]=React.useState(0);
  const handleTabs=(e, val)=>{
    // console.log(val);
    setValue(val);
  };
  return (
    <div>
      <Tabs value={value} onChange={handleTabs}>
        <Tab label="Profile"/>
        <Tab label="Events"/>
        <Tab label="Calendar"/>
      </Tabs>
      <TabPanel value={value} index = {0}>{<Profile/>}</TabPanel>
      <TabPanel value={value} index = {1}>{<Events/>}</TabPanel>
      <TabPanel value={value} index = {2}>{<Calendar/>}</TabPanel>
    </div>
  );
}
/**
 * renders component
 * @return {HTML} tab component
 * @param {object} props
 */
function TabPanel(props) {
  const {children, value, index}=props;
  return (
    <div>
      {value==index && children}
    </div>
  );
}

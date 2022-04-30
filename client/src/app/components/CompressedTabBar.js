// import React, {useState} from 'react';
import React from 'react';
import {Tabs, Tab} from '@mui/material';
import '../stylesheets/MyProfile.css';

/**
 * Creates reusable tab bar
 * @param {object} data tab information (title, component)
 * @param {int} tab default tab
 * @param {*} setTab function to switch tab
 * @return {HTML} Tab bar component
 */
export default function CompressedTabBar({data, tab, setTab}) {
  const handleTabs = (_, value) => {
    setTab(value);
  };

  const TabStyles = {
    marginInline: '1em',
    height: '4rem',
    textTransform: 'none',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '-0.015em',
    color: 'rgba(108, 110, 114, 0.8)',
  };

  return (
    <div>
      <div
        className='tab-container'
        style={{
          height: '4rem',
          width: '100%',
          paddingLeft: '1rem',
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabs}
          indicatorColor='primary'
          sx={{
            '.MuiTabs-indicator': {
              height: '3.5px',
            },
            'height': '100%',
            'width': '100%',
          }}
        >
          {data.map((object) => (
            <Tab
              key={`tab-${object.name}`}
              label={object.name}
              sx={TabStyles}
              disableRipple
            />
          ))}
        </Tabs>
      </div>

      {data.map((object, index) => (
        <TabPanel
          key={`tab-component-${index}`}
          value={tab}
          index={index}
        >
          {object.component}
        </TabPanel>
      ))}
    </div>
  );
}

/**
 * Renders component
 * @return {HTML} Tab component
 * @param {object} children
 * @param {number} value
 * @param {number} index
 */
function TabPanel({children, value, index}) {
  return (
    <div>
      {value === index && children}
    </div>
  );
}

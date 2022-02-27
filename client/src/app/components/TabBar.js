import React, {useState} from 'react';
import {Tabs, Tab} from '@mui/material';
import '../stylesheets/MyProfile.css';

/**
 * Creates reusable tab bar
 * @return {HTML} Tab bar component
 */
export default function TabBar({data, height, width}) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabs = (event, value) => {
    setTabValue(value);
  };

  const TabStyles = {
    marginInline: '1em',
    height: height ? height : '5rem',
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
          height: height ? height : '5rem',
          width: width ? width : '100%',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabs}
          indicatorColor='primary'
          sx={{
            '&& .Mui-selected': {
              color: '#000000',
            },
            '.MuiTabs-indicator': {
              height: '3.5px',
            },
            'height': '100%',
            'width': '100%',
          }}
          centered
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
          value={tabValue}
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

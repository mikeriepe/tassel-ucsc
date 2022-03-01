import * as React from 'react';
import {List} from '@mui/material';
import PeopleCard from '../components/PeopleCard';
import '../stylesheets/Browse.css';

import useAuth from '../util/AuthContext';

/**
 * returns Browsing page
 * @return {HTML} Browse component
 */
export default function Browse() {
  // testing context
  const auth = useAuth();
  console.log(auth);

  return (
    <div className='Browse'>
      <h1>Browse</h1>
      <List
        sx={{
          display: 'grid',
          gap: '2em',
          paddingBlock: '3em',
          width: '785px',
          margin: 'auto',
          borderRadius: '10px',
        }}
      >
        <PeopleCard />
      </List>
    </div>
  );
}

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
        {exampleData && exampleData.map((person, index) => (
          <PeopleCard
            key={`people-list-item-${index}`}
            data={person}
          />
        ))}
      </List>
    </div>
  );
}

const exampleData = [
  {
    name: 'Frederick Douglass',
    major: 'Bachelor of Arts, Arts and Crafts',
    events: '6',
    recommendations: '4',
    availability: '3',
    work: [
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
    ],
    volunteer: [
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
    ],
  },
  {
    name: 'Frederick Douglass',
    major: 'Bachelor of Arts, Arts and Crafts',
    events: '6',
    recommendations: '4',
    availability: '3',
    work: [
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
    ],
    volunteer: [
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
    ],
  },
];

import React, {useEffect} from 'react';
import List from '@mui/material/List';
import PeopleCard from './_OLD_PeopleCard';

/**
 * returns list of people
 * @param {*} props stores filters
 * @return {HTML} list of people
 */
export default function BrowsePeople(props) {
  // NOTE: currently blocked bc profile data structure is subject to change
  // const {locationFilter, oppTypeFilter, orgTypeFilter} = props;

  // component first renders
  useEffect(() => {
    getPeople();
  }, []);

  // get all users
  const getPeople = () => {
    fetch(`/api/getActiveProfiles`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving active profiles');
        });
  };

  return (
    <div>
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

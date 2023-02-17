import React, {useEffect, useState} from 'react';
import MuiBox from '@mui/material/Box';
import useAuth from '../util/AuthContext';
import {Link} from 'react-router-dom';
import {Grid} from '@mui/material';

import DashboardOppThumbnail from './DashboardOppThumbnail';

const UpcomingSection = ({children}, props) => (
  <MuiBox className='grid-flow-large'
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '3em',
      marginRight: '3em',
      marginTop: '.5em',
      height: '100%',
      width: 'calc(100% - 6em)',
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const Text = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * creates Dashboard upcoming events section
 * @return {HTML} Dashboard upcoming events component
 */
export default function DashboardUpcoming({data}) {
  const {userProfile} = useAuth();
  const [joinedOpportunities, setJoinedOpportunities] = useState([]);

  const getJoinedOpportunities = () => {
    fetch(`/api/getPendingOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setJoinedOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving joined opportunities');
        });
  };

  useEffect(() => {
    getJoinedOpportunities();
  }, []);

  const numOpps = joinedOpportunities.length;
  const linkText = 'See all Upcoming Events >>';

  let displayOpps = [];
  if (numOpps > 3) {
    for (let i = 0; i < 3; i++) {
      displayOpps.push(joinedOpportunities[i]);
    }
  } else {
    displayOpps = joinedOpportunities;
  }

  return (
    <UpcomingSection className='grid-flow-large'>
      <div
        className='flex-space-between flex-align-center'
        style={{background: 'var(--background-primary)'}}
      >
        <Text>
          <h2 className='text-dark ellipsis text-medium'>
            Upcoming Events
          </h2>
        </Text>
        <div className='flex-space-between flex-align-center'>
          <Link className='text-bold text-blue ellipsis text-small
          hover-highlight-link'
          to= '/opportunities' state= {{defaultTab: 'upcoming'}}>
            {linkText}
          </Link>
        </div>
      </div>
      {(numOpps > 0) ?
      <Grid container spacing={{xs: 2, md: 3}}>
        {displayOpps.map((opportunity, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <DashboardOppThumbnail
              key={`opportunity-${index}`}
              opportunity={opportunity}
            />
          </Grid>
        ))}
      </Grid> :
      <h5 className='text-bold ellipsis'>
      Explore more events below!
      </h5> }
    </UpcomingSection>
  );
}

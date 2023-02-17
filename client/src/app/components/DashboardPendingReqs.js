import React, {useEffect, useState} from 'react';
import MuiBox from '@mui/material/Box';
import useAuth from '../util/AuthContext';

const PendingSection = ({children}, props) => (
  <MuiBox className='grid-flow-large'
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '3em',
      marginRight: '3em',
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
      flexDirection: 'row',
      justifyContent: 'left',
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
export default function DashboardPendingReqs({data}) {
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

  let displayOpps = [];
  if (numOpps > 3) {
    for (let i = 0; i < 3; i++) {
      displayOpps.push(joinedOpportunities[i]);
    }
  } else {
    displayOpps = joinedOpportunities;
  }

  return (
    <PendingSection>
      <Text>
        <h2 className='text-dark ellipsis text-medium'>
          Pending Requests
        </h2>
      </Text>
    </PendingSection>
  );
}

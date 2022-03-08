import * as React from 'react';
import {useEffect} from 'react';

import useAuth from '../util/AuthContext';
import CreatedOpportunities from './CreatedOpportunities';
import JoinedOpportunities from './JoinedOpportunities';
import PastOpportunities from './PastOpportunities';
import PendingOpportunities from './PendingOpportunities';
import '../stylesheets/OpportunityListItem.css';

/**
 * creates Opportunities
 * @return {HTML} Opportunities component
 */
export default function Opportunities() {
  const {userProfile,
    joinedOpportunities,
    setJoinedOpportunities,
    createdOpportunities,
    setCreatedOpportunities,
    pastOpportunities,
    setPastOpportunities,
    pendingOpportunities,
    setPendingOpportunities} = useAuth();

  // console.log(userProfile);

  const getJoinedOpportunities = () => {
    fetch(`/api/getJoinedOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          // console.log(json);
          setJoinedOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving joined opportunities');
        });
  };

  const getCreatedOpportunities = () => {
    fetch(`/api/getCreatedOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          // console.log(json);
          setCreatedOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving created opportunities');
        });
  };

  const getPastOpportunities = () => {
    fetch(`/api/getPastOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          // console.log(json);
          setPastOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving past opportunities');
        });
  };

  const getPendingOpportunities = () => {
    fetch(`/api/getPendingOpportunities/${userProfile.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          // console.log(json);
          setPendingOpportunities(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving past opportunities');
        });
  };

  useEffect(() => {
    getJoinedOpportunities();
    getCreatedOpportunities();
    getPastOpportunities();
    getPendingOpportunities();
  }, []);

  return (
    <div
      className='opportunity-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <JoinedOpportunities data={joinedOpportunities}/>
      <CreatedOpportunities data={createdOpportunities} />
      <PendingOpportunities data={pendingOpportunities} />
      <PastOpportunities data={pastOpportunities} />
    </div>
  );
}

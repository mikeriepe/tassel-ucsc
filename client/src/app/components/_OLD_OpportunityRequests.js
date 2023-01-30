import * as React from 'react';
import {useState, useEffect} from 'react';
import {Grid} from '@mui/material';
import OpportunityRequestsCreatorView
  from './_OLD_OpportunityRequestsCreatorView';
import OpportunityRequestsVolunteerView
  from './_OLD_OpportunityRequestsVolunteerView';
import useAuth from '../util/AuthContext';

/**
 * OpportunityRequests component
 * @return {html} Opportunity request page
 */
export default function OpportunityRequests({data}) {
  const [opportunityCreator, setOpportunityCreator] = useState(null);
  const {userProfile} = useAuth();

  const getOpportunityCreator = () => {
    fetch(`/api/getProfileName/${data.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setOpportunityCreator(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
  };

  useEffect(() => {
    getOpportunityCreator();
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={12} lg={12} xl={12}
          sx={{display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'}}>
          {opportunityCreator &&
          opportunityCreator.profileid == userProfile.profileid &&
          <OpportunityRequestsCreatorView data={data}/>}

          {opportunityCreator &&
          opportunityCreator.profileid != userProfile.profileid &&
          <OpportunityRequestsVolunteerView data={data}/>}
        </Grid>
      </Grid>

    </div>);
}

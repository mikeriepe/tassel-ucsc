import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/_OLD_Opportunities.css';
import {List, ListItem} from '@mui/material';
import OpportunityCard from './_OLD_OpportunityCard';
import OpportunityCreation from './_OLD_OpportunityCreation';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function CreatedOpportunities({data}) {
  // console.log(data);
  const [opportunityCreationPopup,
    setOpportunityCreationPopup] = useState(false);

  const handleClick = () => {
    setOpportunityCreationPopup(!opportunityCreationPopup);
  };

  return (
    <div>
      <Paper
        className='created-opportunities'
        elevation={3}
        sx={{
          hidden: {opportunityCreationPopup},
          marginBottom: '3rem',
          width: '850px',
          height: 'auto',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='created card-title'>
          Created Opportunities
        </div>

        <List
          sx={{
            display: 'grid',
            gap: '2em',
            paddingTop: '3em',
            width: '785px',
            margin: 'auto',
            borderRadius: '10px',
          }}
        >
          {data && data.map((opportunity, index) => (
            <OpportunityCard data={opportunity} key={index} />
          ))}
        </List>

        {(!data || data.length === 0) &&
        <h2 className='no_results_message'>
          No Created Opportunities found
        </h2>}

        <ListItem
          button
          disableRipple
          onClick={handleClick}
          sx={{
            justifyContent: 'center',
            paddingTop: '0',
            height: '80px',
            width: '100%',
            borderRadius: '10px',
            fontWeight: '600',
            color: '#42a5f5',
            backgroundColor: 'white',
          }}
        >
          Create New Opportunity
        </ListItem>
      </Paper>

      {(opportunityCreationPopup == true) &&
        <OpportunityCreation toggle={handleClick}/>
      }
    </div>
  );
}

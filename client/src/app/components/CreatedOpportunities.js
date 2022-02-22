import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/Opportunities.css';
import {List, ListItem} from '@mui/material';
import OpportunityListItem from './OpportunityListItem';
import OpportunityCreation from './OpportunityCreation';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function CreatedOpportunities({data}) {
  console.log(data);
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
          width: '50vw',
          minHeight: '500px',
          height: 'auto',
          maxHeight: '1000px',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <h2 className='opportunity__tab-title2'>
        Created Opportunities</h2>
        <hr className='opportunity__tab-divider'></hr>
        {data != null && <List sx={{
          width: '48vw',
          margin: 'Auto',
          height: 'auto',
          maxHeight: '800px',
          overflow: 'auto'}} >
          {data && data.map((opportunity, index) => (
            <OpportunityListItem data={opportunity} key={index} />
          ))}

        </List>}

        {(!data || data.length == 0) &&
        <h2 className='no_results_message'>
          No Created Opportunities found
        </h2>}

        <ListItem button
          sx={{
            display: 'flex',
            position: 'relative',
            left: '35%',
            marginTop: '70px',
            height: '60px',
            bottom: '50px',
            width: '300px',
            borderRadius: '10px',
            justifyContent: 'center',
            marginBlockEnd: 'auto',
            color: '#003c6c',
            backgroundColor: 'white',
            fontSize: '16pt'}}
          onClick={handleClick}
        >
          Create New Opportunity
        </ListItem>
      </Paper>

      {(opportunityCreationPopup == true) &&
      <OpportunityCreation toggle={handleClick}/>}
    </div>);
}

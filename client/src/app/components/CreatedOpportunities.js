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

  const handleCancel = () => {
    setOpportunityCreationPopup(!opportunityCreationPopup);
  };

  return (
    <Paper
      className='opportunities'
      elevation={3}
      sx={{
        hidden: {opportunityCreationPopup},
        marginBottom: '3rem',
        width: '50vw',
        minHeight: '500px',
        marginTop: '0px',
        height: 'auto',
        maxHeight: '1000px',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='opportunities__header'>
        <h3>Created Opportunities</h3>
      </div>
      {data != null && <List sx={{
        width: '48vw',
        margin: 'auto',
        height: 'auto',
        maxHeight: '800px',
        overflow: 'auto'}} >
        {data && data.map((opportunity, index) => (
          <OpportunityListItem data={opportunity} key={index} />
        ))}

      </List>}

      {(!data || data.length == 0) &&
      <h2 className='opportunities__no-results-message'>
        No Created Opportunities found
      </h2>}

      <ListItem button
        sx={{
          margin: 'auto',
          marginTop: '70px',
          height: '60px',
          bottom: '50px',
          width: '48vw',
          borderRadius: '10px',
          justifyContent: 'center',
          color: '#003c6c',
          backgroundColor: 'white',
          fontSize: '16pt'}}
        onClick={handleCancel}
      >
        Create New Opportunity
      </ListItem>

      {(opportunityCreationPopup == true) &&
    <OpportunityCreation toggle={handleCancel}/>}
    </Paper>
  );
}

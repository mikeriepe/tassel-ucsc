import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/Opportunities.css';
import {List} from '@mui/material';
import OpportunityListItem from './OpportunityListItem';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function JoinedOpportunities({data}) {
  console.log(data);
  return (
    <Paper
      className='opportunities'
      elevation={3}
      sx={{
        marginBottom: '3rem',
        width: '50vw',
        minHeight: '500px',
        height: 'auto',
        maxHeight: '1000px',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='opportunities__header'>
        <h3>Joined Opportunities</h3>
      </div>
      <List sx={{
        width: '48vw',
        margin: 'Auto',
        height: 'auto',
        maxHeight: '800px',
        overflow: 'auto'}} >
        {data && data.map((opportunity, index) => (
          <OpportunityListItem data={opportunity} key={index} />
        ))}

      </List>
    </Paper>
  );
}

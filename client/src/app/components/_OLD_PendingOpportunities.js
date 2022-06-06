import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/_OLD_Opportunities.css';
import {List} from '@mui/material';
import OpportunityCard from './_OLD_OpportunityCard';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function PendingOpportunities({data}) {
  return (
    <Paper
      className='pending-opportunities'
      elevation={3}
      sx={{
        marginBottom: '3rem',
        width: '850px',
        height: 'auto',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='pending card-title'>
        Pending Opportunities
      </div>

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
        {data && data.map((opportunity, index) => (
          <OpportunityCard data={opportunity} key={index} />
        ))}
      </List>

      {(!data || data.length == 0) && <h2 className='no_results_message'>
        No Pending Opportunities found
      </h2>}
    </Paper>
  );
}

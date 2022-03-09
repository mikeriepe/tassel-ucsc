import * as React from 'react';
import {List} from '@mui/material';
import Paper from '@mui/material/Paper';
import OpportunityCard from './OpportunityCard';
import '../stylesheets/Opportunities.css';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function JoinedOpportunities({data}) {
  // console.log(data);

  return (
    <Paper
      className='joined-opportunities'
      elevation={3}
      sx={{
        marginBlock: '3rem',
        width: '850px',
        height: 'auto',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='joined card-title'>
        Joined Opportunities
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
          <OpportunityCard
            key={`opportunity-list-item-${index}`}
            data={opportunity}
          />
        ))}
      </List>
    </Paper>
  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileWork({data}) {
  console.log(data.job1);
  return (
    <Paper
      elevation={3}
      sx={{
        marginBottom: '3rem',
        width: '55vw',
        height: '500px',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='profile-header'>
        <h3>Work Experience</h3>
      </div>
      {data && data.job1 &&
        <div className='profile-work'>
          <h3>{data.job1.title}</h3>
          <h4>{data.job1.company}</h4>
          <h4>{data.job1.location}</h4>
          <p>{data.job1.start + ' - ' + data.job1.end}</p>
          <p>{data.job1.description}</p>
        </div>}
    </Paper>
  );
}

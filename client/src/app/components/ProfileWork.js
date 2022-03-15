import * as React from 'react';
import Paper from '@mui/material/Paper';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileWork({data}) {
  // console.log(data.job1);
  return (
    <Paper
      elevation={3}
      sx={{
        marginBottom: '3rem',
        width: '850px',
        height: 'auto',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='experience card-title'>
        Work Experience
      </div>
      {data && data.job1 &&
        <div className='experience-text'>
          <div className='experience-text-title'>{data.job1.title}</div>
          <div className='experience-text-company'>
            {data.job1.company}
          </div>
          <div className='experience-text-location'>
            {data.job1.location}
          </div>
          <div className='experience-text-date'>
            {data.job1.start + ' - ' + data.job1.end}
          </div>
          <div className='experience-text-description'>
            {data.job1.description}
          </div>
        </div>
      }
    </Paper>
  );
}

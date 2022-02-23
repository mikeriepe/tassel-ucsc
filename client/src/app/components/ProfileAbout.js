import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/MyProfile.css';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileAbout({data}) {
  return (
    <Paper
      elevation={3}
      sx={{
        marginBottom: '3rem',
        width: '55vw',
        height: 'auto',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='profile-header'>
        <h3>About</h3>
      </div>
      <div className='profile-about-desc'>
        <p>
          {data}
        </p>
      </div>
    </Paper>
  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/MyProfile.css';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileVolunteer({data}) {
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
        <h3>Volunteer Experience</h3>
      </div>
    </Paper>
  );
}

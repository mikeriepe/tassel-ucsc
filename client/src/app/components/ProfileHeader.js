import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/MyProfile.css';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileHeader({data}) {
  const exampleData = {
    name: 'Chad Chadwick',
    major: 'Bachelor of Arts, Business Management Economics',
    year: 'Class of 1775',
    location: 'California, United States',
  };
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        marginBottom: '3rem',
        width: '55vw',
        height: '500px',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='profile-cover'>
        <div className='profile-cover-image' />
      </div>
      <div className='profile-avatar' />
      <div className='profile-description'>
        <h1 className='profile-name'>{exampleData.name}</h1>
        <div className='profile-subdescription'>
          <div className='profile-major'>{exampleData.major}</div>
          <div className='profile-year'>{exampleData.year}</div>
          <div className='profile-location'>{exampleData.location}</div>
        </div>
      </div>
    </Paper>
  );
}

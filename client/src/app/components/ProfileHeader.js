import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import '../stylesheets/MyProfile.css';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileHeader({data}) {
  const handleError = (e) => {
    e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        marginBottom: '3rem',
        marginTop: '3rem',
        width: '55vw',
        height: '375px',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='profile-head'>
        <div className='profile-cover'>
          <div className='profile-cover-image' />
        </div>
        <Avatar src={data.profilepicture}
          sx={{width: '220px',
            height: '220px',
            position: 'absolute',
            left: '70px'}}
          alt="Remy Sharp"
          onError={handleError}
        />
        <div className='profile-description'>
          <h1 className='profile-name'>
            {data.firstname + ' ' + data.lastname}
          </h1>
          <div className='profile-subdescription'>
            <div className='profile-major'>{data.major}</div>
            <div className='profile-year'>{data.graduationyear}</div>
            <div className='profile-location'>{data.location}</div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

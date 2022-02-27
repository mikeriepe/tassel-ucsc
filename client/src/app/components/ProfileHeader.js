import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import '../stylesheets/MyProfile.css';
import ExampleCover from '../assets/examplecover.png';

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
        marginBlock: '3rem',
        width: '850px',
        height: '500px',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='header-upper'>
        <img
          className='header-upper-cover'
          src={ExampleCover}
        />
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-avatar'>
          <Avatar src={data.profilepicture}
            sx={{
              width: '100%',
              height: '100%',
              border: '6px solid white',
            }}
            alt='Remy Sharp'
            onError={handleError}
          />
        </div>
        <div className='header-bottom-text'>
          <div className='header-bottom-text-name'>
            {data.firstname + ' ' + data.lastname}
          </div>
          <div className='header-bottom-text-major'>
            Bachelor of Science, {data.major}
          </div>
          <div className='header-bottom-text-year'>
            Class of {data.graduationyear}
          </div>
          <div className='header-bottom-text-location'>
            California, United States
          </div>
        </div>
      </div>
    </Paper>
  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

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
      className='profile-header'
      elevation={3}
      sx={{
        marginBottom: '3rem',
        width: '50vw',
        height: '500px',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <Avatar src={data.profilepicture}
        sx={{width: '200px', height: '200px'}}
        alt="Remy Sharp"
        onError={handleError}
      />
      <div>
        <h1>{data.firstname + ' ' + data.lastname}</h1>
      </div>
    </Paper>
  );
}

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero
          id faucibus nisl tincidunt eget nullam non nisi. Sed enim ut sem
          viverra aliquet eget sit. Morbi enim nunc faucibus a pellentesque
          sit amet porttitor. Nunc consequat interdum varius sit amet mattis
          vulputate enim. Non quam lacus suspendisse faucibus. Ut morbi
          tincidunt augue interdum velit. Quisque egestas diam in arcu cursus
          euismod quis viverra nibh. Eu volutpat odio facilisis mauris sit amet
          massa. Eu lobortis elementum nibh tellus molestie nunc. Nisl nisi
          scelerisque eu ultrices vitae auctor. Ipsum dolor sit amet consectetur
          adipiscing elit duis tristique. Dictumst quisque sagittis purus sit
          amet volutpat consequat mauris nunc. At tellus at urna condimentum
          mattis pellentesque.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero
          id faucibus nisl tincidunt eget nullam non nisi. Sed enim ut sem
          viverra aliquet eget sit. Morbi enim nunc faucibus a pellentesque
          sit amet porttitor. Nunc consequat interdum varius sit amet mattis
          vulputate enim. Non quam lacus suspendisse faucibus. Ut morbi
          tincidunt augue interdum velit. Quisque egestas diam in arcu cursus
          euismod quis viverra nibh. Eu volutpat odio facilisis mauris sit amet
          massa. Eu lobortis elementum nibh tellus molestie nunc. Nisl nisi
          scelerisque eu ultrices vitae auctor. Ipsum dolor sit amet consectetur
          adipiscing elit duis tristique.
        </p>
      </div>
    </Paper>
  );
}

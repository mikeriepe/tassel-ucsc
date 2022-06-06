import * as React from 'react';
import {styled} from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import ExampleCover from '../assets/examplecover.png';

const Header = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  position: 'relative',
  width: 'calc(60% + 4em)',
  height: '500px',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Banner = ({image}, props) => (
  <MuiBox
    sx={{
      height: '65%',
      width: '100%',
      borderRadius: '10px',
    }}
    {...props}
  >
    <img
      src={image}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
        height: '100%',
        width: '100%',
        borderRadius: '10px 10px 0 0',
      }}
    />
  </MuiBox>
);

const Content = ({children}, props) => (
  <MuiBox sx={{height: '35%'}} {...props}>
    {children}
  </MuiBox>
);

const Avatar = ({image, handleError}, props) => (
  <MuiBox
    sx={{
      height: '220px',
      width: '220px',
      position: 'absolute',
      left: '50px',
      top: '42%',
    }}
  >
    <MuiAvatar
      src={image}
      sx={{
        width: '100%',
        height: '100%',
        border: '6px solid white',
      }}
      alt='Remy Sharp'
      onError={handleError}
      {...props}
    />
  </MuiBox>
);

const Text = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '20em',
      height: '100%',
      width: 'calc(100% - 20em)',
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileHeader({data}) {
  const handleError = (e) => {
    e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  };

  return (
    <Header>
      <Banner image={ExampleCover} />
      <Content>
        <Avatar image={data.profilepicture} handleError={handleError} />
        <Text>
          <h2 className='text-dark ellipsis'>
            {data.firstname + ' ' + data.lastname}
          </h2>
          <h5 className='text-bold text-blue ellipsis'>
            Bachelors in {data.major}
          </h5>
          <p className='ellipsis'>Class of {data.graduationyear}</p>
          <p className='ellipsis'>{data.userlocation}</p>
        </Text>
      </Content>
    </Header>
  );
}

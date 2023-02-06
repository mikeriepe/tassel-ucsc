import React from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {styled} from '@mui/material';
import Button from '@mui/material/Button';
import MuiBox from '@mui/material/Box';
import useAuth from '../util/AuthContext';
import ProfileAlert from '../components/ProfileAlert';
import ProfileHeader from '../components/ProfileHeader';
import ProfileAbout from '../components/ProfileAbout';
import ProfileWork from '../components/ProfileWork';
import ProfileVolunteer from '../components/ProfileVolunteer';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1em',
  marginBlock: '1em',
}));

/**
 * creates Proflie Page
 * @return {HTML} Profile component
 */
export default function Profile() {
  const {user, userProfile} = useAuth();
  const navigate = useNavigate();

  const handleDeactivateAccount = () => {
    fetch(`/api/userDeactivation`, {
      method: 'POST',
      body: JSON.stringify({active: false, userid: user.userid}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          toast.success('Deactivation Successful', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUser({useremail: '',
            userid: '',
            active: false});
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err);
          alert('Error deactivating account, please try again');
        });
  };

  return (
    <Page>
      {userProfile && (
        <>
          <ProfileAlert
            data={{
              'profileid': userProfile.profileid,
              'status': userProfile.status,
              'requestinfo': userProfile.requestinfo,
              'requestresponse': userProfile.requestresponse,
            }}
          />
          <ProfileHeader data={userProfile} />
          <ProfileAbout data={userProfile?.about}/>
          <ProfileWork data={userProfile?.experience} />
          <ProfileVolunteer data={userProfile?.volunteeringexperience} />
          {user && user.userid === userProfile.userid &&
            <Button onClick={handleDeactivateAccount}>
              Deactivate Account
            </Button>
          }
        </>
      )}
    </Page>
  );
}

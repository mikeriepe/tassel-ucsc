import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Button from '@mui/material/Button';
import useAuth from '../util/AuthContext';
import ProfileHeader from '../components/ProfileHeader';
import ProfileAbout from '../components/ProfileAbout';
import ProfileWork from '../components/ProfileWork';
import ProfileVolunteer from '../components/ProfileVolunteer';

/**
 * creates Calendar
 * @return {HTML} Calendar component
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
    <div
      className='profile-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ProfileHeader
        data={userProfile} />
      <ProfileAbout data={userProfile.about}/>
      {userProfile.experience && <ProfileWork data={userProfile.experience}/>}
      {!userProfile.experience && <ProfileWork data=''/>}
      {userProfile.volunteeringexperience &&
        <ProfileVolunteer data={userProfile.volunteeringexperience}/>}
      {!userProfile.volunteeringexperience && <ProfileWork data=''/>}
      {user &&
        <Button sx={{display: 'flex', paddingBottom: '2rem'}}
          onClick={handleDeactivateAccount}>
            Deactivate Account
        </Button>
      }
    </div>
  );
}

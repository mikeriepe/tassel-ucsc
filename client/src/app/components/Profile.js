import * as React from 'react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
  const [profile, setProfile] = useState(null);
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  const getProfile = () => {
    fetch(`/api/getProfileByProfileId/${params.profileid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setProfile(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving profile, please try again');
        });
  };

  React.useEffect(() => {
    if (params && params.profileid != null) {
      getProfile();
    }
  }, []);

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
      {profile == null && <>
        {userProfile && <ProfileHeader
          data={userProfile} />}
        {!userProfile && <ProfileHeader
          data='' />}
        {userProfile.about && <ProfileAbout data={userProfile.about}/>}
        {!userProfile.about && <ProfileAbout data=''/>}
        {userProfile.experience && <ProfileWork data={userProfile.experience}/>}
        {!userProfile.experience && <ProfileWork data=''/>}
        {userProfile.volunteeringexperience &&
          <ProfileVolunteer data={userProfile.volunteeringexperience}/>}
        {!userProfile.volunteeringexperience && <ProfileVolunteer data=''/>}
        {user && user.userid == userProfile.userid &&
          <Button sx={{display: 'flex', paddingBottom: '2rem'}}
            onClick={handleDeactivateAccount}>
              Deactivate Account
          </Button>
        }
      </>}
      {profile && profile != null && <>
        {profile && <ProfileHeader
          data={profile} />}
        {!profile && <ProfileHeader
          data={profile} />}
        {profile.about && <ProfileAbout data={profile.about}/>}
        {!profile.about && <ProfileAbout data={profile.about}/>}
        {profile.experience && <ProfileWork data={profile.experience}/>}
        {!profile.experience && <ProfileWork data=''/>}
        {profile.volunteeringexperience &&
          <ProfileVolunteer data={profile.volunteeringexperience}/>}
        {!profile.volunteeringexperience && <ProfileVolunteer data=''/>}
      </>}
    </div>
  );
}

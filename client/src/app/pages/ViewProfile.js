import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material';
import MuiBox from '@mui/material/Box';
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
 * creates Calendar
 * @return {HTML} Calendar component
 */
export default function ViewProfile() {
  const [profile, setProfile] = useState(null);
  const params = useParams();

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

  useEffect(() => {
    getProfile();
    // getStatus();
  }, []);

  return (
    <Page>
      {profile && profile !== null && (
        <>
          <ProfileHeader data={profile} />
          {<ProfileAbout data={profile?.about}/>}
          {<ProfileWork data={profile?.experience}/>}
          {<ProfileVolunteer data={profile?.volunteeringexperience}/>}
        </>
      )}
    </Page>
  );
}

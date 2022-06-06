import * as React from 'react';
import {useParams} from 'react-router-dom';
import useAuth from '../util/AuthContext';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileWork from './ProfileWork';
import ProfileVolunteer from './ProfileVolunteer';
/**
 * creates Calendar
 * @return {HTML} Calendar component
 */
export default function ProfilePage() {
  const params = useParams();
  console.log(params);
  const [profile, setProfile] = React.useState(null);
  
  const getProfile = () => {
    fetch(`/api/getProfile/${params.profileid}`)
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
          alert('Error retrieving selected profile');
        });
    };
    
    React.useEffect(() => {
      getProfile();
    }, []);
  
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
        data={profile} />
      <ProfileAbout data={profile.about}/>
      {profile.experience && <ProfileWork data={profile.experience}/>}
      {!profile.experience && <ProfileWork data=''/>}
      {profile.volunteeringexperience &&
        <ProfileVolunteer data={profile.volunteeringexperience}/>}
      {!profile.volunteeringexperience && <ProfileWork data=''/>}
    </div>
  );
}

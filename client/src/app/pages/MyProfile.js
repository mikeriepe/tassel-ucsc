import * as React from 'react';
import '../stylesheets/MyProfile.css';
import TabBar from '../components/TabBar';
import {useNavigate} from 'react-router-dom';
import useAuth from '../util/AuthContext';
import {toast} from 'react-toastify';

/**
 * creates the profile page
 * @return {HTML} my profile page
 */
export default function MyProfile() {
  const navigate = useNavigate();
  const {user, setUser} = useAuth();

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
          setUser({useremail: user.useremail,
            userid: user.userid,
            active: false});
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err);
          alert('Error deactivating account, please try again');
        });
  };

  return (
    <div className='MyProfile'>
      <h1>My Profile</h1>
      <TabBar />
      {user.active && <button onClick={handleDeactivateAccount}>
        Deactivate Account
      </button>}
    </div>
  );
}

import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import TabBar from '../components/TabBar';
import Profile from '../components/Profile';
import Opportunities from '../components/Opportunities';
import Calendar from '../components/Calendar';
import useAuth from '../util/AuthContext';

/**
 * creates the profile page
 * @return {HTML} my profile page
 */
export default function MyProfile() {
  const navigate = useNavigate();
  const {user, setUser} = useAuth();
  const [tab, setTab] = React.useState(0);

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

  const data = [
    {name: 'Profile', component: <Profile />},
    {name: 'Opportunities', component: <Opportunities />},
    {name: 'Calendar', component: <Calendar />},
  ];

  return (
    <div className='MyProfile'>
      <TabBar data={data} tab={tab} setTab={setTab}/>
      {user.active &&
        <button onClick={handleDeactivateAccount}>
          Deactivate Account
        </button>
      }
    </div>
  );
}

import * as React from 'react';
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Button} from '@mui/material';
import '../stylesheets/Verify.css';
/**
 * email verification page
 * @return {HTML} verification page
 */
export default function Verify() {
  const params = useParams();
  console.log(params);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`/api/verify/${params.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((json) => {
          setStatus('Success');
        })
        .catch((err) => {
          console.log(err);
          setStatus('Failed');
          alert('Error verifying account');
        });
  }, [params]);

  return (
    <div className='Verify'>
      {status == 'Success' && <div className='verificationResponse'>
        <h2 className='response'>User Profile Successfully Activated</h2>
        <p>You can now login to your account and start building your profile</p>
        <Button sx={{border: '1px solid black', width: '100px',
          display: 'flex', marginX: 'auto'}}>
          <Link className='link' to="/login"
            state={{signUp: false}}
          >
              Log In
          </Link>
        </Button>
      </div>}
      {status == 'Failed' && <div className='verificationResponse'>
        <h2 className='response'>User Profile Could Not Be Activated</h2>
        <p>Your link was either invalid or expired.</p>
      </div>}
    </div>
  );
}

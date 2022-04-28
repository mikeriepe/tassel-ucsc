import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ThemedButton from '../components/ThemedButton';
import SignupBanner from '../assets/SignupBanner.png';
import '../stylesheets/LoginSignup.css';

const PaperStyling = {
  display: 'flex',
  width: '1000px',
  height: '600px',
  borderRadius: '10px',
  filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
  color: 'inherit',
};

/**
 * Email verification page
 * @return {JSX}
 */
export default function TestVerify() {
  const params = useParams();
  const navigate = useNavigate();
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

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <Box className='page'>
      <Paper className='card' elevation={0} sx={PaperStyling}>
        <div className='card-banner flow-small padding-64'>
          <p className='text-bold text-italic text-white'>Logo.</p>
          <h3 className='text-xbold text-white'>
            Grow your connection with the UCSC community!
          </h3>
          <img src={SignupBanner} />
        </div>
        <Box
          className='card-content padding-64'
          component='form'
          noValidate
          autoComplete='on'
        >
          <div
            className='flow-large'
            style={{display: status === 'Success' ? null : 'none'}}
          >
            <div className='grid-flow-large text-center'>
              <h2 className='text-normal'>Success!</h2>
              <p className='text-gray text-lineheight-24'>
                We have successfully created your new account. However, an admin
                must approve your account. You will have access to our site, but
                certain features will be restricted until your account has been
                approved. Look out for an email detailing your account&apos;s
                approval.
              </p>
            </div>
            <div className='grid-flow-small grid-center text-center'>
              <div className='flex-flow-small'>
                <ThemedButton
                  color={'yellow'}
                  variant={'themed'}
                  onClick={handleNavigate}
                >
                  Login
                </ThemedButton>
              </div>
              <p className='text-light'>
                Need help? Contact us at
                <span className='text-bold text-blue'>
                  &nbsp;tasselsupport@gmail.com
                </span>
              </p>
            </div>
          </div>
          <div
            className='flow-large'
            style={{display: status !== 'Success' ? null : 'none'}}
          >
            <div className='grid-flow-large text-center'>
              <h2 className='text-normal'>Profile Could Not Be Activated</h2>
              <p className='text-gray text-lineheight-24'>
                Your link was either invalid or had expired. If you need more
                information or help, please send a message to the email
                address given below.
              </p>
            </div>
            <div className='grid-flow-small grid-center text-center'>
              <p className='text-light'>
                Need help? Contact us at
                <span className='text-bold text-blue'>
                  &nbsp;tasselsupport@gmail.com
                </span>
              </p>
            </div>
          </div>
        </Box>
      </Paper>
    </Box>
  );
}

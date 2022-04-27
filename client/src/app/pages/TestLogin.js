import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {InputContext} from '../components/ThemedInput';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import LoginBanner from '../assets/LoginBanner.png';
import useAuth from '../util/AuthContext';
import '../stylesheets/LoginSignup.css';

const PaperStyling = {
  display: 'flex',
  width: '1000px',
  height: '600px',
  borderRadius: '10px',
  filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
  color: 'inherit',
};

const InputLabelStyling = {
  '.MuiTypography-root': {
    fontFamily: 'inherit',
    fontSize: '0.8rem',
    fontWeight: 'inherit',
    color: '#8B95A5',
  },
  'marginLeft': '1em',
};

/**
 * Creates login page
 * @return {HTML} login page
 */
export default function TestLogin() {
  const navigate = useNavigate();
  const {user, setUser, setLoggedIn, setUserProfile} = useAuth();

  const [stepPage, setStepPage] = useState('login');
  const [values, setValues] = useState({
    'login': {
      useremail: '',
      userpassword: '',
    },
    'forgot1': {
      useremail: '',
    },
    'forgot2': {
      newpassword: '',
      confirmpassword: '',
    },
  });

  useEffect(() => {
    if (user != null) {
      getProfile();
    }
  }, [user]);

  const login = () => {
    fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify(values['login']),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            return res.json();
          } else if (res.status == 401) {
            throw res;
          } else {
            throw res;
          }
        })
        .then((json) => {
          toast.success('Login Success', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoggedIn(true);
          setUser(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Invalid Username or Password. Please Try Again.');
        });
  };

  const getProfile = () => {
    fetch(`/api/getProfile/${user.userid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setUserProfile(json);
          navigate(`/myprofile`);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving profile, please try again');
        });
  };

  const handleNextPage = (step) => {
    setStepPage(step);
  };

  return (
    <InputContext.Provider value={[values, setValues]}>
      <Box className='page'>
        <Paper className='card' elevation={0} sx={PaperStyling}>
          <div className='card-banner flow-small padding-64'>
            <p className='text-bold text-italic text-white'>Logo.</p>
            <h3 className='text-xbold text-white'>Welcome back!</h3>
            <img src={LoginBanner} />
          </div>
          <Box
            className='card-content padding-64'
            component='form'
            autoComplete='on'
            noValidate
          >
            <LoginForm
              active={stepPage === 'login'}
              handleNextPage={(e) => handleNextPage(e)}
              login={login}
            />
            <ForgotPasswordOne
              active={stepPage === 'forgot1'}
              handleNextPage={(e) => handleNextPage(e)}
            />
            <ForgotPasswordTwo
              active={stepPage === 'forgot2'}
              handleNextPage={(e) => handleNextPage(e)}
            />
            <ForgotPasswordThree
              active={stepPage === 'forgot3'}
              handleNextPage={(e) => handleNextPage(e)}
            />
          </Box>
        </Paper>
      </Box>
    </InputContext.Provider>
  );
}

/**
 * Login form
 * @return {JSX}
 */
function LoginForm({active, handleNextPage, login}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/signup');
  };

  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large'>
        <div>
          <h2 className='text-normal'>Login</h2>
          <p className='text-light text-warning'>
            Required <span className='text-bold'>*</span>
          </p>
        </div>
        <p className='text-gray text-lineheight-24'>
          Enter your email address and password
          below to login to your account.
        </p>
      </div>
      <div className='grid-flow-large'>
        <div className='grid-flow-small'>
          <p className='text-bold'>
            Email <span className='text-bold text-warning'>*</span>
          </p>
          <ThemedInput
            placeholder={'bobsmith@gmail.com'}
            type={'text'}
            index={'useremail'}
            step={'login'}
          />
        </div>
        <div className='grid-flow-small'>
          <p className='text-bold'>
            Password <span className='text-bold text-warning'>*</span>
          </p>
          <ThemedInput
            placeholder={'Your password'}
            type={'password'}
            index={'userpassword'}
            step={'login'}
          />
          <p
            className='text-blue clickable'
            onClick={(e) => handleNextPage('forgot1')}
          >
            Forgot your password?
          </p>
        </div>
      </div>
      <div className='grid-flow-small'>
        <div>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            type={'submit'}
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Login
          </ThemedButton>
          <FormControlLabel
            label='Keep me logged in'
            control={<Checkbox disableRipple />}
            sx={InputLabelStyling}
          />
        </div>
        <p className='text-light'>
          Don&apos;t have an account?
          <span
            className='text-bold text-blue clickable'
            onClick={handleNavigate}
          >
            &nbsp;Register here
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * Part one of changing password
 * @return {JSX}
 */
function ForgotPasswordOne({active, handleNextPage}) {
  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large'>
        <h2 className='text-normal'>Forgot your password?</h2>
        <p className='text-gray text-lineheight-24'>
          Don&apos;t worry, we can help you out! If you remember
          your email address, you can quickly reset your password.
          Input your email address and we&apos;ll send you a link to your
          email that will allow you to reset your password.
        </p>
      </div>
      <div className='grid-flow-small'>
        <p className='text-bold'>Email</p>
        <ThemedInput
          placeholder={'bobsmith@gmail.com'}
          type={'text'}
          index={'useremail'}
          step={'forgot1'}
        />
      </div>
      <div className='grid-flow-small'>
        <div className='flex-flow-large'>
          <ThemedButton
            color={'yellow'}
            variant={'cancel'}
            value={'login'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={'forgot2'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Request password change
          </ThemedButton>
        </div>
        <p className='text-light'>
          Need help? Contact us at
          <span className='text-bold text-blue'> tasselsupport@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Part two of changing password
 * @return {JSX}
 */
function ForgotPasswordTwo({active, handleNextPage}) {
  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large'>
        <h2 className='text-normal'>Change your password</h2>
        <p className='text-gray text-lineheight-24'>
          Enter your new password below.
          We strongly advise you to store it safely.
        </p>
      </div>
      <div className='grid-flow-large'>
        <div className='grid-flow-small'>
          <p className='text-bold'>New Password</p>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
            index={'newpassword'}
            step={'forgot2'}
          />
        </div>
        <div className='grid-flow-small'>
          <p className='text-bold'>Confirm Password</p>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
            index={'newpassword'}
            step={'forgot2'}
          />
        </div>
      </div>
      <div className='grid-flow-small'>
        <div className='flex-flow-large'>
          <ThemedButton
            color={'yellow'}
            variant={'cancel'}
            value={'login'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Cancel
          </ThemedButton>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={'forgot3'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Change password
          </ThemedButton>
        </div>
        <p className='text-light'>
          Need help? Contact us at
          <span className='text-bold text-blue'> tasselsupport@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Part three of changing password
 * @return {JSX}
 */
function ForgotPasswordThree({active}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large text-center'>
        <h2 className='text-normal'>Success!</h2>
        <p className='text-gray text-lineheight-24'>
          We have successfully changed your password.
          Click the button below to login to your account.
        </p>
      </div>
      <div className='grid-flow-small grid-center'>
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
          <span className='text-bold text-blue'> tasselsupport@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

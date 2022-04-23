import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {InputContext} from '../components/ThemedInput';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import Checkbox from '@mui/material/Checkbox';
import LoginBanner from '../assets/LoginBanner.png';
import useAuth from '../util/AuthContext';
import '../stylesheets/TestLogin.css';

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
      email: '',
    },
    'forgot2': {
      newPass: '',
      confirmPass: '',
    },
  });

  useEffect(() => {
    if (user != null) {
      getProfile();
    }
  }, [user]);

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

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

  const handleSubmit = (e) => {
    login();
  };

  const handleNextPage = (step) => {
    setStepPage(step);
  };

  return (
    <InputContext.Provider value={[values, setValues]}>
      <Box
        className='login-page-container'
        component='form'
        noValidate
        autoComplete='on'
        onSubmit={handleSubmit}
      >
        <Paper
          className='login-box-container'
          elevation={0}
          sx={{
            display: 'flex',
            width: '1000px',
            height: '600px',
            borderRadius: '10px 0 0 10px',
            filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
            color: '#8B95A5',
          }}
        >
          <div className='login-box-left'>
            <div className='login-box-left-content'>
              <div className='login-box-left-logo'>
                Logo.
              </div>
              <div className='login-box-left-headline'>
                Welcome back!
              </div>
              <img src={LoginBanner} />
            </div>
          </div>
          <div className='login-box-right'>
            <LoginForm
              active={stepPage === 'login'}
              handleNextPage={(e) => handleNextPage(e)}
            />
            <ForgotPasswordOne
              active={stepPage === 'forgot1'}
              handleNextPage={(e) => handleNextPage(e)}
            />
            <ForgotPasswordTwo
              active={stepPage === 'forgot2'}
              handleNextPage={(e) => handleNextPage(e)}
            />
            <ForgotPasswordThree active={stepPage === 'forgot3'} />
          </div>
        </Paper>
      </Box>
    </InputContext.Provider>
  );
}

/**
 * Step one of login
 * @return {JSX}
 */
function LoginForm({active, handleNextPage}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/testsignup');
  };

  return (
    <div
      className='login-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div className='gap-vert-large'>
        <div>
          <div className='text-title text-dark'>
            Login
          </div>
          <div className='text-small text-warning gap-hori-small'>
            <div className='text-light'>
              Required
            </div>
            <div className='text-bold'>
              *
            </div>
          </div>
        </div>
        <div className='text-small' style={{width: '70%', lineHeight: '25px'}}>
          Enter your email address and password below to login to your account.
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-vert-small'>
          <div className='text-small text-bold gap-hori-small'>
            <div className='text-dark'>
              Email
            </div>
            <div className='text-warning'>
              *
            </div>
          </div>
          <ThemedInput
            placeholder={'bobsmith@gmail.com'}
            type={'text'}
            index={'useremail'}
            step={'login'}
          />
        </div>
        <div className='gap-vert-small'>
          <div className='text-small text-bold gap-hori-small'>
            <div className='text-dark'>
              Password
            </div>
            <div className='text-warning'>
              *
            </div>
          </div>
          <ThemedInput
            placeholder={'Your password'}
            type={'password'}
            index={'userpassword'}
            step={'login'}
          />
        </div>
        <div
          className='text-small text-blue'
          onClick={(e) => handleNextPage('forgot1')}
          style={{cursor: 'pointer'}}
        >
          Forgot your password?
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-hori-large' style={{gap: '20px'}}>
          <div>
            <ThemedButton
              color={'yellow'}
              variant={'themed'}
              type={'submit'}
            >
              Login
            </ThemedButton>
          </div>
          <div
            className='text-small'
            style={{display: 'flex', alignItems: 'center'}}
          >
            <Checkbox disableRipple />
            <div>
              Keep me logged in
            </div>
          </div>
        </div>
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Don&apos;t have an account?
          </div>
          <div
            className='text-bold text-blue'
            onClick={handleNavigate}
            style={{cursor: 'pointer'}}
          >
            Register here
          </div>
        </div>
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
    <div
      className='login-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div className='gap-vert-large'>
        <div className='text-title text-dark'>
          Forgot your password?
        </div>
        <div className='text-small' style={{lineHeight: '25px'}}>
          Don&apos;t worry, we can help you out! If you remember your
          email address, you can quickly reset your password. Input your
          email address and we&apos;ll send you a link to your email that will
          allow you to reset your password.
        </div>
      </div>
      <div className='gap-vert-small'>
        <div className='text-small text-bold text-dark gap-hori-small'>
          Email
        </div>
        <ThemedInput
          placeholder={'bobsmith@gmail.com'}
          type={'text'}
          index={'email'}
          step={'forgot1'}
        />
      </div>
      <div className='gap-vert-large'>
        <div className='gap-hori-large'>
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
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Need help? Contact us at
          </div>
          <div className='text-bold text-blue'>
            tasselsupport@gmail.com
          </div>
        </div>
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
    <div
      className='login-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div className='gap-vert-large'>
        <div className='text-title text-dark'>
          Change your password
        </div>
        <div className='text-small' style={{width: '80%', lineHeight: '25px'}}>
          Enter your new password below.
          We strongly advise you to store it safely.
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-vert-small'>
          <div className='text-small text-bold text-dark gap-hori-small'>
            New Password
          </div>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
            index={'newPass'}
            step={'forgot2'}
          />
        </div>
        <div className='gap-vert-small'>
          <div className='text-small text-bold text-dark gap-hori-small'>
            Confirm New Password
          </div>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
            index={'confirmPass'}
            step={'forgot2'}
          />
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-hori-large'>
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
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Need help? Contact us at
          </div>
          <div className='text-bold text-blue'>
            tasselsupport@gmail.com
          </div>
        </div>
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
    navigate('/testlogin');
  };

  return (
    <div
      className='login-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div className='login-step-four-text gap-vert-large'>
        <div className='text-title text-dark'>
          Success!
        </div>
        <div className='text-small' style={{lineHeight: '25px'}}>
          We have successfully changed your password.
          Click the button below to login to your account.
        </div>
      </div>
      <div className='gap-vert-large'>
        <ThemedButton
          color={'yellow'}
          variant={'themed'}
          onClick={handleNavigate}
        >
          Login
        </ThemedButton>
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Need help? Contact us at
          </div>
          <div className='text-bold text-blue'>
            tasselsupport@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

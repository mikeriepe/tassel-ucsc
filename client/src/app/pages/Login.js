import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Stack} from '@mui/material';
import {toast} from 'react-toastify';
import '../stylesheets/Login.css';

import useAuth from '../util/AuthContext';

/**
 * creates login page
 * @return {HTML} login page
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [signUp, setSignUp] = useState(location.state.signUp);


  // eslint-disable-next-line no-unused-vars
  const {user, setUser, setLoggedIn, userProfile, setUserProfile} = useAuth();
  // console.log('current user: ', user);
  // console.log('current user profile: ', userProfile);

  const [accountLoginCredentials, setAccountLoginCredentials] = useState({
    useremail: '',
    userpassword: '',
  });

  const [newAccountCredentials, setnewAccountCredentials] = useState({
    useremail: '',
    userpassword: '',
    active: 'false',
  });


  const handleChange = (e) => {
    const {name, value} = e.target;
    setAccountLoginCredentials({...accountLoginCredentials, [name]: value});
  };

  const handleChangeNewAccount = (e) => {
    const {name, value} = e.target;
    setnewAccountCredentials({...newAccountCredentials, [name]: value});
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  const handleEnterNewAccount = (e) => {
    if (e.key === 'Enter') {
      createUser();
    }
  };

  const toggleSignup = () => {
    setSignUp(!signUp);
  };

  useEffect(() => {
    setSignUp(location.state.signUp);
  }, [location.key, location.state]);

  useEffect(() => {
    if (user != null) {
      getProfile();
    }
  }, [user]);

  const createUser = () => {
    fetch(`/api/userCreation`, {
      method: 'POST',
      body: JSON.stringify(newAccountCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json.userid);
          fetch(`/api/profileCreation`, {
            method: 'POST',
            body: JSON.stringify({userid: json.userid}),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          toast.success('Account created', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUser(json);
          setLoggedIn(true);
          navigate(`/`);
        });
  };

  const login = () => {
    fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify(accountLoginCredentials),
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
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err);
          alert('Invalid Username or Password, Please Try Again');
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
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving profile, please try again');
        });
  };

  return (
    <div className="LoginPage">
      {!signUp && <div className="LoginPage__body">
        <Stack className="LoginPage__inputBody">
          <div className="LoginPage__topText">Log In</div>
          <label className="LoginPage__label">
              Email
            <input
              className="LoginPage__input"
              name="useremail"
              value={accountLoginCredentials.useremail}
              onChange={handleChange}
              onKeyDown={handleEnter}/>
          </label>
          <label className="LoginPage__label">
              Password
            <input
              type="password"
              className="LoginPage__input"
              name="userpassword"
              value={accountLoginCredentials.userpassword}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
          </label>
          <button
            className="LoginPage__submitButton"
            onClick={login}
          >
            Submit
          </button>
          <button
            className="LoginPage__submitButton"
            onClick={toggleSignup}
          >
            Sign Up
          </button>
        </Stack>
      </div>}
      {signUp && <div className="LoginPage__body">
        <Stack className="LoginPage__inputBody">
          <div className="LoginPage__topText">Sign Up</div>
          <label className="LoginPage__label">
          Email
            <input
              className="LoginPage__input"
              name="useremail"
              value={newAccountCredentials.useremail}
              onChange={handleChangeNewAccount}
              onKeyDown={handleEnterNewAccount}
            />
          </label>
          <label className="LoginPage__label">
          Password
            <input
              type="password"
              className="LoginPage__input"
              name="userpassword"
              value={newAccountCredentials.userpassword}
              onChange={handleChangeNewAccount}
              onKeyDown={handleEnterNewAccount}
            />
          </label>

          <button
            className="LoginPage__submitButton"
            onClick={createUser}
          >
            Submit
          </button>
          <button
            className="LoginPage__submitButton"
            onClick={toggleSignup}
          >
            Log in
          </button>
        </Stack>
      </div>}
    </div>
  );
}

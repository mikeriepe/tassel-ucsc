import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Stack} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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

  const {user, setUser} = useAuth();
  console.log(user);

  const [accountLoginCredentials, setAccountLoginCredentials] = useState({
    useremail: '',
    userpassword: '',
  });

  const [newAccountCredentials, setnewAccountCredentials] = useState({
    useremail: '',
    userpassword: '',
    usertype: '',
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
      login();
    }
  };

  const toggleSignup = () => {
    setSignUp(!signUp);
  };

  useEffect(() => {
    setSignUp(location.state.signUp);
  }, [location.key, location.state]);

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
          toast.success('Account created', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUser(newAccountCredentials.useremail);
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
          if (!res.ok) {
            throw res;
          }
          return res.json();
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
          setUser(accountLoginCredentials.useremail);
          navigate(`/`);
        })
        .catch((err) => {
          alert('Error logging in, please try again');
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
          <button className="LoginPage__submitButton">
            <Link className='LoginPage__link' to="/">
              <MenuItem>Back</MenuItem>
            </Link>
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
          <FormControl className="LoginPage_radio">
            <FormLabel id="radio-buttons-group-label">Account Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              defaultValue="volunteer"
              name="usertype"
              value={newAccountCredentials.usertype}
              onChange={handleChangeNewAccount}
            >
              <FormControlLabel
                value="volunteer"
                control={<Radio />}
                label="Volunteer"
              />
              <FormControlLabel
                value="sponsor"
                control={<Radio />}
                label="Sponsor"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </FormControl>

          <button
            className="LoginPage__submitButton"
            onClick={createUser}
          >
            Submit
          </button>
          <button className="LoginPage__submitButton">
            <Link className='LoginPage__link' to="/">
              <MenuItem>Back</MenuItem>
            </Link>
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

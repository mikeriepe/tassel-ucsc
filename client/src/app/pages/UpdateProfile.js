import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material';
import MuiBox from '@mui/material/Box';
import {toast} from 'react-toastify';
import useAuth from '../util/AuthContext';
import ThemedInput from '../components/ThemedInput';
import ThemedButton from '../components/ThemedButton';
import {InputContext} from '../components/ThemedInput';


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
export default function UpdateProfile() {
  const {user} = useAuth();
  // const navigate = useNavigate();

  const [values, setValues] = useState({
    1: {
      graduationyear: '',
      major: '',
      userlocation: '',
      about: '',
    },
  });
  const updateProfile = () => {
    fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify({userid: user.userid, ...values[1]}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        }); toast.success('Account updated', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile();
  };

  return (
    <Page>
      <InputContext.Provider value={[values, setValues]}>
        <Box className='page' aria-label='Signup form'>
          <Box className='card-content padding-64'>
            <div className='flow-large' style={
              {display: null}
            }>
              <div>
                <h2 className='text-normal'>Update Profile</h2>
                <p className='text-light text-warning'>
                  Required <span className='text-bold'>*</span>
                </p>
              </div>
              <div className='grid-flow-large'>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Graduation Year
                    <span className='text-bold text-warning'>*</span>
                  </p>
                  <ThemedInput
                    placeholder={'2022'}
                    type={'text'}
                    index={'graduationyear'}
                    step={1}
                    fill={'graduationyear'}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Major <span className='text-bold text-warning'>*</span>
                  </p>
                  <ThemedInput
                    placeholder={'Engineering'}
                    type={'text'}
                    index={'major'}
                    step={1}
                    fill={'major'}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Location
                  </p>
                  <ThemedInput
                    placeholder={'Let people know more about yourself'}
                    type={'text'}
                    index={'userlocation'}
                    step={1}
                    fill={'userlocation'}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    About You
                  </p>
                  <ThemedInput
                    placeholder={'Let people know more about yourself'}
                    type={'text'}
                    index={'about'}
                    step={1}
                    fill={'about'}
                  />
                </div>
              </div>
              <div className='grid-flow-small'>
                <div className='flex-flow-large'>
                  <ThemedButton
                    aria-label='Next step button'
                    color={'yellow'}
                    variant={'themed'}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save
                  </ThemedButton>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </InputContext.Provider>
    </Page>
  );
}

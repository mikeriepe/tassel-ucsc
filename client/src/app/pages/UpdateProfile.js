import React, {useEffect, useState} from 'react';
import {Modal, Box} from '@mui/material';
import {styled} from '@mui/material';
import MuiBox from '@mui/material/Box';
import {toast} from 'react-toastify';
import useAuth from '../util/AuthContext';
import ThemedInput from '../components/ThemedInput';
import ThemedButton from '../components/ThemedButton';
import {InputContext} from '../components/ThemedInput';
import {Link} from 'react-router-dom';
import WorkExperienceList from '../components/WorkExperienceList';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonBase from '@mui/material/ButtonBase';
import WorkExperienceForm from '../components/WorkExperienceForm';
import WorkExperienceDeleteModal from '../components/WorkExperienceDeleteModal';
import VolunteerExperienceForm from '../components/VolunteerExperienceForm';
import VolunteerExperienceDeleteModal from
  '../components/VolunteerExperienceDeleteModal';
import VolunteerExperienceList from '../components/VolunteerExperienceList';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1em',
  marginBlock: '1em',
  overflow: 'auto',
}));


const OutlinedIconButton = ({children}, props) => (
  <ButtonBase
    component='div'
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      padding: 0,
      background: 'transparent',
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);


/**
 * updates Profile Calendar
 * @return {HTML} Update Profile component
 */
export default function UpdateProfile() {
  const {user, userProfile} = useAuth();
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showDeleteVolunteerModal,
    setShowDeleteVolunteerModal] = useState(false);
  const [keywords, setKeywords] = useState(null);

  const getKeywords = () => {
    fetch(`/api/getKeywords`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setKeywords(json);
          console.log(keywords);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving keywords, please try again');
        });
  };

  if (userProfile.experience === null) {
    userProfile.experience = {};
  }
  if (userProfile.volunteeringexperience === null) {
    userProfile.volunteeringexperience = {};
  }

  const [values, setValues] = useState({
    1: {
      graduationyear: userProfile.graduationyear,
      major: userProfile.major,
      userlocation: userProfile.userlocation,
      about: userProfile.about,
    },
  });
  const updateProfile = () => {
    fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify({userid: user.userid, ...userProfile}),
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

  const updateLocalUserProfileData = () => {
    userProfile.graduationyear = values[1].graduationyear;
    userProfile.major = values[1].major;
    userProfile.userlocation = values[1].userlocation;
    userProfile.about = values[1].about;
  };

  const handleSubmit = (e) => {
    updateLocalUserProfileData();
    updateProfile();
  };

  useEffect(() => {
    getKeywords();
  }, []);

  return (
    <Page>
      <InputContext.Provider value={[values, setValues]}>
        <Box className='updatepage' width='100%' aria-label='Signup form'>
          <Box className='update-card-content'>
            <div className='flex-space-multi' style={
              {display: null}
            }>
              <div>
                <h2 className='text-normal'>Update Profile</h2>
                <p className='text-light text-warning'>
                  Required <span className='text-bold'>*</span>
                </p>
              </div>
              <div className='grid-flow-large' width='100%'>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Graduation Year
                    <span className='text-bold text-warning'>*</span>
                  </p>
                  <ThemedInput
                    placeholder={'Enter your graduation year'}
                    type={'text'}
                    index={'graduationyear'}
                    step={1}
                    fill={'graduationyear'}
                    content={values[1].graduationyear === '' ?
                    null : values[1].graduationyear}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Major <span className='text-bold text-warning'>*</span>
                  </p>
                  <ThemedInput
                    placeholder={'Enter your major'}
                    type={'text'}
                    index={'major'}
                    step={1}
                    fill={'major'}
                    content={values[1].major === '' ?
                    null : values[1].major}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    Location
                  </p>
                  <ThemedInput
                    placeholder={'Let people know where you are'}
                    type={'text'}
                    index={'userlocation'}
                    step={1}
                    fill={'userlocation'}
                    content={values[1].userlocation === '' ?
                    null : values[1].userlocation}
                  />
                </div>
                <div className='grid-flow-small'>
                  <p className='text-bold'>
                    About You
                  </p>
                  <ThemedInput
                    placeholder={'Tell people a little about yourself'}
                    type={'text'}
                    index={'about'}
                    step={1}
                    fill={'about'}
                    content={values[1].about === '' ?
                    null : values[1].about}
                  />
                </div>
                <div className='grid-flow-small'>
                  <div
                    className='flex-space-between flex-align-center'
                    style={{background: 'var(--background-primary)'}}
                  >
                    <p className='text-bold'>
                    Work Experience
                    </p>
                    <div className='flex-space-between flex-align-center'>
                      {(
                        <OutlinedIconButton>
                          <RemoveIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowDeleteModal(true)}
                          />
                        </OutlinedIconButton>
                      )}
                      {(
                        <OutlinedIconButton>
                          <AddIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowWorkForm(true)}
                          />
                        </OutlinedIconButton>
                      )}
                    </div>
                  </div>
                  <WorkExperienceList
                    workExperience={userProfile.experience} />
                </div>
                <div className='grid-flow-small'>
                  <div
                    className='flex-space-between flex-align-center'
                    style={{background: 'var(--background-primary)'}}
                  >
                    <p className='text-bold'>
                    Volunteer Experience
                    </p>
                    <div className='flex-space-between flex-align-center'>
                      {(
                        <OutlinedIconButton>
                          <RemoveIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowDeleteVolunteerModal(true)}
                          />
                        </OutlinedIconButton>
                      )}
                      {(
                        <OutlinedIconButton>
                          <AddIcon
                            sx={{
                              height: '20px',
                              width: '20px',
                              color: 'var(--text-gray)',
                              stroke: 'var(--text-gray)',
                              strokeWidth: '2px',
                            }}
                            onClick={() => setShowVolunteerForm(true)}
                          />
                        </OutlinedIconButton>
                      )}
                    </div>
                  </div>
                  <VolunteerExperienceList
                    volunteerExperience={userProfile.volunteeringexperience} />
                </div>
              </div>
              <div className='grid-flow-small'>
                <div className='flex-flow-large'>
                  <Link to='/myprofile'>
                    <ThemedButton
                      aria-label='Next step button'
                      color={'blue'}
                      variant={'themed'}
                    >
                      Back
                    </ThemedButton>
                  </Link>
                  <Link to='/myprofile'>
                    <ThemedButton
                      aria-label='Next step button'
                      color={'yellow'}
                      variant={'themed'}
                      onClick={(e) => handleSubmit(e)}
                    >
                      Save
                    </ThemedButton>
                  </Link>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </InputContext.Provider>
      <Modal
        open={showWorkForm}
        onBackdropClick={() => setShowWorkForm(false)}
        onClose={() => setShowWorkForm(false)}
      >
        <WorkExperienceForm onClose={() =>
          setShowWorkForm(!showWorkForm)}/>
      </Modal>
      <Modal
        open={showDeleteModal}
        onBackdropClick={() => setShowDeleteModal(false)}
        onClose={() => setShowDeleteModal(false)}
      >
        <WorkExperienceDeleteModal onClose={() =>
          setShowDeleteModal(!showDeleteModal)}/>
      </Modal>
      <Modal
        open={showVolunteerForm}
        onBackdropClick={() => setShowVolunteerForm(false)}
        onClose={() => setShowVolunteerForm(false)}
      >
        <VolunteerExperienceForm onClose={() =>
          setShowVolunteerForm(!showVolunteerForm)}/>
      </Modal>
      <Modal
        open={showDeleteVolunteerModal}
        onBackdropClick={() => setShowDeleteVolunteerModal(false)}
        onClose={() => setShowDeleteVolunteerModal(false)}
      >
        <VolunteerExperienceDeleteModal onClose={() =>
          setShowDeleteVolunteerModal(!showDeleteVolunteerModal)}/>
      </Modal>
    </Page>
  );
}

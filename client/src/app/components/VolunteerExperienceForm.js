import Box from '@mui/material/Box';
import React from 'react';
import {StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {TextInput} from './TextInput';
import {DateInput} from './DateInput';
import ThemedButton from '../components/ThemedButton';
import useAuth from '../util/AuthContext';


/**
 * VolunteerExperienceForm
 * Volunteer Experience Form Component
 * Displays form to collect data for new Volunteer Experience
 * @param {Function} onClose
 * @return {HTML} VolunteerExperienceForm component
 */
export default function VolunteerExperienceForm({onClose}) {
  const {userProfile} = useAuth();

  const formValues = {
    jobtitle: '',
    company: '',
    jobcity: '',
    jobstate: '',
    description: '',
    startdate: (new Date()),
    enddate: null,
    currentposition: false,
  };

  const methods = useForm({defaultValues: formValues});
  const {handleSubmit, control} = methods;

  const addVolunteerExperienceToProfile = (data) => {
    let startDate = '';
    if (data.startdate !== '') {
      startDate = data.startdate.toISOString().split('T')[0];
      const startDateValues = startDate.split('-').reverse('');
      startDate = startDateValues[1] + '/' +
      startDateValues[0] + '/' + startDateValues[2];
    }

    let endDate = '';
    if (data.enddate !== '' && data.enddate !== null) {
      endDate = data.enddate.toISOString().split('T')[0];
      const endDateValues = endDate.split('-').reverse('');
      endDate = endDateValues[1] + '/' +
      endDateValues[0] + '/' + endDateValues[2];
    }

    let newLocation = '';
    if (data.jobcity !== '' && data.jobstate !== '') {
      newLocation = data.jobcity + ', ' + data.jobstate;
    } else if (data.jobstate === '') {
      newLocation = data.jobcity;
    } else {
      newLocation = data.jobstate;
    }
    const newVolunteerExperience = {
      title: data.jobtitle,
      company: data.company,
      location: newLocation,
      description: data.description,
      start: startDate,
      end: data.enddate !== null ? endDate : '',
      currentposition: data.currentposition,
    };
    const newJobIndex =
      (Object.keys(userProfile.volunteeringexperience).length+1).toString();
    const newJobParam = 'job' + newJobIndex;
    userProfile.volunteeringexperience[newJobParam] = newVolunteerExperience;
  };

  const updateProfile = () => {
    fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify({userid: userProfile.userid, ...userProfile}),
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
    return;
  };

  const onSubmit = (data) => {
    addVolunteerExperienceToProfile(data);
    updateProfile();
    onClose();
  };

  return (
    <Paper
      sx={{
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: '10',
        boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
        borderRadius: '10px',
        marginTop: '3rem',
        marginRight: '3rem',
        marginLeft: '3rem',
        padding: '1rem',
      }}
    >
      <StepLabel
        sx={{
          display: 'flex',
          color: 'darkgray',
          opacity: '50%',
          marginBottom: '10px',
        }}
      >
        Add New Volunteer Experience
      </StepLabel>

      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridGap: '1vw',
          marginBottom: '10px',
        }}
      >
        <Box>
          <TextInput
            name='jobtitle'
            control={control}
            label='Voluneer Position Title'
          />

          <TextInput
            name='company'
            control={control}
            label='Company'
          />

          {/* Dropdown Menus*/}
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridGap: '10px',
            }}
          >
            {
              <TextInput
                name='jobcity'
                control={control}
                label='City'
              />
            }
            <TextInput
              name='jobstate'
              control={control}
              label='State'
            />
          </Box>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

              {/* DATE PICKER WRAPPER */}
              <Box
                sx={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridGap: '10px',
                }}
              >
                <DateInput
                  name='startdate'
                  control={control}
                  label='Start Date'
                />
                <DateInput
                  name='enddate'
                  control={control}
                  label='End Date'
                />
              </Box>
            </LocalizationProvider>
          </Box>

          <TextInput
            name='description'
            control={control}
            label='Enter Description'
            multi={true}
          />

        </Box>
      </Box>

      {/* Submit/Cancel Button wrapper */}
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'max-content',
          justifyContent: 'end',
        }}
      >
        <div className='grid-flow-small'>
          <div className='flex-flow-large'>
            <ThemedButton
              onClick={onClose}
              aria-label='Next step button'
              color={'blue'}
              variant={'themed'}
              sx={{
                marginRight: '10px',
              }}
            >
              Cancel
            </ThemedButton>
            <ThemedButton
              aria-label='Next step button'
              color={'yellow'}
              variant={'themed'}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </ThemedButton>
          </div>
        </div>
      </Box>
    </Paper>
  );
}

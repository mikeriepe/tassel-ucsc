import Box from '@mui/material/Box';
import React, {useState, useEffect} from 'react';
import {Button, StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Controller, useForm} from 'react-hook-form';

import {TextInput} from './TextInput';
import {TimeInput} from './TimeInput';
import {DropdownInput} from './DropdownInput';
import {RadioInput} from './RadioInput';
import {DateInput} from './DateInput';
import useAuth from '../util/AuthContext';


/**
 * OpportunityForm
 * Opportunity Form Component
 * Displays form to collect data for new opportunity
 * @param {Function} onClose
 * @return {HTML} OpportunityForm component
 */
export default function OpportunityForm({onClose}) {
  const {userProfile} = useAuth();

  const [opportunityTypes, setOpportunityTypes] = useState(null);
  const [organizationTypes, setOrganizationTypes] = useState(null);
  const [organizations, setOrganizations] = useState(null);

  const formValues = {
    eventname: '',
    usersponsors: {'creator': userProfile.profileid},
    locationtype: 'in-person',
    eventlocation: {}, // TODO:
    eventzoomlink: '',
    organization: null, // TODO:
    description: null,
    userparticipants: [],
    preferences: null,
    eventdata: null,
    startdate: (new Date()),
    enddate: null,
    active: true,
    // eslint-disable-next-line max-len
    eventbanner: 'https://www.sorenkaplan.com/wp-content/uploads/2017/07/Testing.jpg',
    organizationtype: null, // TODO:
    opportunitytype: '',
    roles: null, // TODO:
    starttime: null,
    endtime: null,
    subject: null,
    assignedroles: {},
  };

  const getOpportunityTypes = () => {
    fetch(`/api/getOpportunityTypes`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const oppTypes = [];
          json.map((type, index) => (
            oppTypes.push({
              label: type.name,
              value: type.name,
            })
          ));
          console.log('OPP TYPE JSON', json);
          console.log('OPP TYPE', oppTypes);
          setOpportunityTypes(oppTypes);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity types');
        });
  };

  const getOrganizationTypes = () => {
    fetch(`/api/getOrganizationTypes`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const orgTypes = [];
          json.map((type, index) => (
            orgTypes.push({
              label: type.name,
              value: type.name,
            })
          ));
          console.log('ORG TYPE JSON', json);
          console.log('ORG TYPE', orgTypes);
          setOrganizationTypes(orgTypes);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organization types');
        });
  };

  const getOrganizations = () => {
    console.log(getValues());
    fetch(`/api/getOrganizations/${getValues().organizationtype}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const orgs = [];
          json.map((type, index) => (
            orgs.push({
              label: type.name,
              value: type.name,
            })
          ));
          console.log('ORG JSON', json);
          console.log('ORGS', orgs);
          setOrganizations(orgs);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organizations');
        });
  };

  const subjectOptions = [
    {
      label: 'Computer Science',
      value: 'computer science',
    },
    {
      label: 'Computer Engineering',
      value: 'computer engineering',
    },
    {
      label: 'Art',
      value: 'art',
    },
  ];

  const locationOptions = [
    {
      label: 'In-Person',
      value: 'in-person',
    },
    {
      label: 'Remote',
      value: 'remote',
    },
    {
      label: 'Hybrid',
      value: 'hybrid',
    },
  ];

  const sponsorOptions = [
    {
      label: 'User Sponsored',
      value: 'user sponsor',
    },
    {
      label: 'Organization Sponsored',
      value: 'organization sponsor',
    },
  ];

  const methods = useForm({defaultValues: formValues});
  const {handleSubmit, control, getValues} = methods;

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  useEffect(() => {
    getOrganizationTypes();
    getOpportunityTypes();
  }, []);

  useEffect(() => {
    getOrganizations();
  }, [getValues().organizationtype]);

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
        New Opportunity
      </StepLabel>

      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridGap: '1vw',
          gridTemplateColumns: '45vw',
          marginBottom: '10px',
        }}
      >

        {/* LEFT SECTION */}
        <Box>
          <TextInput
            name='eventname'
            control={control}
            label='Opportunity Title'
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
                opportunityTypes ?
                <DropdownInput
                  name='opportunitytype'
                  control={control}
                  label='Opportunity Type'
                  options={opportunityTypes}
                />:
                <Skeleton variant="rectangular" width={325} height={26} />
            }
            <DropdownInput
              name='locationtype'
              control={control}
              label='Location Type'
              options={locationOptions}
              defaultValue='in-person'
            />
          </Box>

          <RadioInput
            name='sponsor'
            control={control}
            label='Opportunity Sponsor'
            options={sponsorOptions}
          />

          <TextInput
            name='description'
            control={control}
            label='Enter Description'
            multi={true}
          />
        </Box>

        {/* RIGHT SECTION */}
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

            {/* TIME PICKER WRAPPER */}
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridGap: '10px',
              }}
            >
              <TimeInput
                name='starttime'
                control={control}
                label='Start Time'
              />
              <TimeInput
                name='endtime'
                control={control}
                label='End Time'
              />
            </Box>

          </LocalizationProvider>

          <DropdownInput
            name='subject'
            control={control}
            label='Subject'
            options={subjectOptions}
          />
          <TextInput
            name='eventdata'
            control={control}
            label='Other details'
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
        <Button
          onClick={onClose}
          sx={{
            display: 'flex',
            position: 'relative',
            width: '100px',
            height: '50px',
            marginRight: '5px',
            backgroundColor: 'gray',
            fontSize: '8pt',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            position: 'relative',
            width: '100px',
            height: '50px',
            backgroundColor: '#fdc700',
            fontSize: '8pt',
          }}
        >
          Create Opportunity
        </Button>
      </Box>
    </Paper>
  );
}

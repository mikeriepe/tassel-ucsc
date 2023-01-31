import Box from '@mui/material/Box';
import React, {useState, useEffect} from 'react';
import {Button, StepLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {useForm} from 'react-hook-form';

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

  const [currOrganizationType, setCurrOrganizationType] = useState(null);
  const [currLocationType, setCurrLocationType] = useState('in-person');
  const [currSponsorType, setCurrSponsorType] = useState('user sponsor');

  const formValues = {
    eventname: '',
    usersponsors: {'creator': userProfile.profileid},
    locationtype: 'in-person',
    eventlocation: {
      'address': '',
      'state': '',
      'city': '',
      'zip': '',
    },
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
    organizationtype: null,
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
          setOrganizationTypes(orgTypes);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organization types');
        });
  };

  const getOrganizations = () => {
    fetch(`/api/getOrganizations/${currOrganizationType}`)
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
          setOrganizations(orgs);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organizations');
        });
  };

  const handleSponsorChange = (e) => {
    const value = e.target.value;
    setCurrSponsorType(value);
  };

  const handleOrganizationTypeChange = (e) => {
    const value = e.target.value;
    setCurrOrganizationType(value);
  };

  const handleLocationTypeChange = (e) => {
    const value = e.target.value;
    setCurrLocationType(value);
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
    // TODO: check roles under max

    // Make sure no values written
    // to DB that do not match location/sponsor type
    if (data.locationtype == 'in-person') {
      data.eventzoomlink = '';
    }

    if (data.locationtype == 'remote') {
      data.eventlocation = {};
    }

    if (currSponsorType == 'user sponsor') {
      data.organization = null;
      data.organizationtype = null;
    }

    console.log(data);
    onClose();
  };

  useEffect(() => {
    getOrganizationTypes();
    getOpportunityTypes();
  }, []);

  useEffect(() => {
    getOrganizations();
  }, [currOrganizationType]);

  return (
    <Paper
      sx={{
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: '10',
        boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
        borderRadius: '10px',
        margin: '3rem',
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
              customOnChange={handleLocationTypeChange}
            />
          </Box>

          <RadioInput
            name='sponsor'
            control={control}
            label='Opportunity Sponsor'
            options={sponsorOptions}
            customOnChange={handleSponsorChange}
          />

          {/* ORGANIZATION DETAILS */}
          {
            currSponsorType == 'organization sponsor' &&
              <Box>
                <DropdownInput
                  name='organizationtype'
                  control={control}
                  label='Organization Type'
                  options={organizationTypes}
                  customOnChange={handleOrganizationTypeChange}
                />
                <DropdownInput
                  name='organization'
                  control={control}
                  label='Organization'
                  options={organizations}
                />
              </Box>
          }

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

          {/* ADDRESS */}
          {
            currLocationType != 'remote' &&
            <Box>
              <TextInput
                name='eventlocation.address'
                control={control}
                label='Enter Street Address'
              />
              <TextInput
                name='eventlocation.city'
                control={control}
                label='Enter City'
              />

              <Box
                sx={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridGap: '10px',
                }}
              >
                <TextInput
                  name='eventlocation.state'
                  control={control}
                  label='Enter State/Province'
                />
                <TextInput
                  name='eventlocation.zip'
                  control={control}
                  label='Enter Zipcode'
                />
              </Box>
            </Box>
          }

          {/* ZOOM LINK */}
          {
            currLocationType != 'in-person' &&
            <TextInput
              name='eventzoomlink'
              control={control}
              label='Event Zoom Link'
            />
          }

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

import Box from '@mui/material/Box';
import React, {useState, useEffect} from 'react';
import {StepLabel, IconButton, FormHelperText} from '@mui/material';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {toast} from 'react-toastify';
import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';

import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';

import ThemedButton from '../components/ThemedButton';
import {TextInput} from './TextInput';
import {TimeInput} from './TimeInput.js';
import {DropdownInput} from './DropdownInput';
import {CheckboxInput} from './CheckboxInput';
import {DateInput} from './DateInput';


/**
 * OpportunityForm
 * Opportunity Form Component
 * Displays form to collect data for new opportunity
 * @param {Function} onClose
 * @return {HTML} OpportunityForm component
 */
export default function OpportunityForm({onClose, defaultValues, onSubmit}) {
  const [opportunityTypes, setOpportunityTypes] = useState([]);

  // Selected tags by the user
  const [selectedTags, setSelectedTags] = useState(
    defaultValues.keywords ?
    Object.values(defaultValues.keywords) :
    [],
  );
  const [allTags, setAllTags] = useState([]);

  const getKeywords = () => {
    fetch(`/api/getKeywords`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const tempKeywords = [];
          for (let i = 0; i < json.length; i++) {
            tempKeywords.push(json[i].value);
          }
          const filteredAllTags = tempKeywords.
              filter((x) => !selectedTags.includes(x));
          setAllTags(filteredAllTags);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving keywords, please try again');
        });
  };

  const [currLocationType, setCurrLocationType] = useState(
      defaultValues.locationtype,
  );
  const [currSponsorType, setCurrSponsorType] = useState(
      defaultValues.organization ?
      'organization sponsor' :
      'user sponsor',
  );
  const [currRoles, setCurrRoles] = useState(
    defaultValues.roles && defaultValues.roles !== null ?
    defaultValues.roles : [],
  );
  const [roleError, setRoleError] = useState('');
  const maxRoles = 3;
  // All tags array hardcoded for now
  // Will be stored in the DB in the future
  // setAllTags
  // const [allTags, setAllTags] = useState(filteredAllTags);
  const validationSchema = Yup.object().shape({
    eventname: Yup.string().required('Event name is required'),
    locationtype: Yup.string().required('Location type is required'),
    organizationsponsor: Yup.string().notRequired(),
    eventlocation: Yup.object().shape({
      'address': Yup.string().when([], {
        is: () => currLocationType != 'remote',
        then: Yup.string().required('Street address is required'),
        otherwise: Yup.string().notRequired(),
      }),
      'city': Yup.string().when([], {
        is: () => currLocationType != 'remote',
        then: Yup.string().required('City is required'),
        otherwise: Yup.string().notRequired(),
      }),
      'state': Yup.string().when([], {
        is: () => currLocationType != 'remote',
        then: Yup.string().required('State/province is required'),
        otherwise: Yup.string().notRequired(),
      }),
      'zip': Yup.string().when([], {
        is: () => currLocationType != 'remote',
        then: Yup.string().required('Zip code is required'),
        otherwise: Yup.string().notRequired(),
      }),
    }),
    // TODO: check website format?
    eventzoomlink: Yup.string().when([], {
      is: () => currLocationType != 'in-person',
      then: Yup.string().required('Event zoom link is required'),
      otherwise: Yup.string().notRequired(),
    }),
    organization: Yup.string().when([], {
      is: () => currSponsorType == 'organization sponsor',
      then: Yup.string().required('Organization is required'),
      otherwise: Yup.string().notRequired(),
    }),
    description: Yup.string().required('Description is required'),
    eventdata: Yup.string().required('Other details required'),
    startdate: Yup
        .date()
        .required('Start date is required'),
    enddate: Yup
        .date()
        .min(Yup.ref('startdate'), 'End date must be after start date')
        .required('End date is required'),
    opportunitytype: Yup.string().required('Opportunity type is required'),
    starttime: Yup
        .date()
        .required('Start time is required'),
    endtime: Yup
        .date()
        .min(Yup.ref('starttime'), 'End time must be after start time')
        .required('End time is required'),
    subject: Yup.string().required('Subject is required'),
    keywords: Yup.object().notRequired(),
  });

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

  const handleSponsorChange = (e) => {
    setCurrSponsorType(
      currSponsorType == 'user sponsor' ?
      'organization sponsor' : 'user sponsor',
    );
  };

  const handleLocationTypeChange = (e) => {
    const value = e.target.value;
    setCurrLocationType(value);
  };

  const combineTimeDate = (time, date) => {
    const combined = new Date();

    // get and set time elements
    combined.setHours(time.getHours(), time.getMinutes());

    // get date elements
    combined.setDate(date.getDate());
    combined.setMonth(date.getMonth());
    combined.setFullYear(date.getFullYear());

    return combined;
  };

  const handleAdditionalRoleClick = () => {
    if (currRoles.length < maxRoles) {
      const rolesCopy = [...currRoles];
      rolesCopy.push('');
      console.log(rolesCopy);
      setCurrRoles(rolesCopy);
    } else {
      toast.error('Maximum number of roles reached', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleRemoveRoleClick = (e) => {
    const rolesCopy = [...currRoles];
    const roleIndex = parseInt(e.target.parentElement.id, 10);
    rolesCopy.splice(roleIndex, 1);
    setCurrRoles(rolesCopy);
  };

  const handleRoleChange = (e) => {
    const roleIndex = parseInt(e.target.id, 10);
    const rolesCopy = [...currRoles];
    rolesCopy[roleIndex] = e.target.value;
    setCurrRoles(rolesCopy);
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

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    getOpportunityTypes();
    getKeywords();
  }, []);

  const handleDeleteTag = (tagIndexToDelete) => () => {
    const tempSelectedTags = [...selectedTags];
    // add the to be deleted tag back to all tags
    const tempAllTags = [...allTags];
    tempAllTags.push(tempSelectedTags[tagIndexToDelete]);
    // delete the tag from the selected tags array
    tempSelectedTags.splice(tagIndexToDelete, 1);
    // update the arrays
    setSelectedTags(tempSelectedTags);
    setAllTags(tempAllTags);
  };

  const handleAddTag = (tagIndexToAdd) => () => {
    const tempAllTags = [...allTags];
    // add the tag to the selected tags array
    const tempSelectedTags = [...selectedTags];
    tempSelectedTags.push(tempAllTags[tagIndexToAdd]);

    // delete the to be added tag from all tags array
    tempAllTags.splice(tagIndexToAdd, 1);
    // update the arrays
    setSelectedTags(tempSelectedTags);
    setAllTags(tempAllTags);
  };

  const convertTagsToObject = (tags) => {
    const tagsObject = {};
    for (let i = 0; i < tags.length; i++) {
      tagsObject[`keyword${i}`] = tags[i];
    }
    return tagsObject;
  };

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
          marginBottom: '5px',
        }}
      >

        {/* LEFT SECTION */}
        <Box>
          <TextInput
            name='eventname'
            control={control}
            label='Opportunity Title'
            register={register}
          />

          {/* Dropdown Menus*/}
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridGap: '10px',
              marginTop: '5px',
            }}
          >
            {
                opportunityTypes ?
                <DropdownInput
                  name='opportunitytype'
                  control={control}
                  label='Opportunity Type'
                  options={opportunityTypes}
                  register={register}
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
              register={register}
            />
          </Box>

          <CheckboxInput
            name='organizationsponsor'
            control={control}
            label='Organization Sponsor'
            customOnChange={handleSponsorChange}
            defaultChecked={
              currSponsorType == 'organization sponsor'
            }
          />

          {/* ORGANIZATION DETAILS */}
          {
            currSponsorType == 'organization sponsor' &&
              <Box>
                <TextInput
                  name='organization'
                  control={control}
                  label='Organization'
                  register={register}
                />
              </Box>
          }

          <TextInput
            name='description'
            control={control}
            label='Enter Description'
            multi={true}
            register={register}
          />

          <Box sx={{marginTop: '5px', marginBottom: '10px'}}>
            <Box sx={{
              marginBottom: '5px',
              display: 'grid',
              gridAutoFlow: 'column',
              gridGap: '5px',
            }}>
              <FormLabel value='eventroles'
                sx={{display: 'flex',
                  position: 'relative',
                  fontSize: '12pt',
                  height: '25px',
                  top: '6px',
                  ml: '2px',
                }}
              >
                Opportunity Roles
              </FormLabel>
              <IconButton
                size='small'
                sx = {{color: '#00C2FF'}}
                aria-label="additional opportunity role"
                onClick={handleAdditionalRoleClick}
              >
                <AddCircleIcon />
              </IconButton>
            </Box>

            {
              currRoles.length > 0 &&
              currRoles.map((role, index) => (
                <Box
                  key={`role${index}`}
                  id={index.toString()}
                >
                  <TextField
                    sx={{
                      marginTop: '5px',
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}
                    name={`role${index}`}
                    id={index.toString()}
                    value={role}
                    onChange={handleRoleChange}
                    label='Role Name'
                  />
                  <IconButton
                    id={index.toString()}
                    aria-label="remove opportunity role"
                    color="inherit"
                    sx = {{position: 'relative',
                      marginTop: '12px',
                      marginLeft: '5px'}}
                    onClick={handleRemoveRoleClick}
                  >
                    <RemoveCircleOutlineIcon
                      sx={{color: 'red'}}
                      fontSize="large"
                    />
                  </IconButton>
                </Box>
              ))
            }
            <FormHelperText sx={{color: 'red'}}>{roleError}</FormHelperText>
          </Box>
          <FormLabel value='keywords'
            sx={{display: 'flex',
              position: 'relative',
              fontSize: '12pt',
              height: '25px',
              top: '6px',
              ml: '2px',
            }}
          >
            Tags
          </FormLabel>
          <Box sx={{marginTop: '5px'}}>
            <Box sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridGap: '5px',
              backgroundColor: 'rgb(255, 255, 255)',
              minHeight: '40px',
              display: 'block',
              padding: '5px',
              borderRadius: '5px',
            }}>
              {/* Show the selected tags here */}
              {selectedTags.map((tag, index) => (
                <Chip
                  label={tag}
                  key={`role${index}`}
                  id={index.toString()}
                  sx={{
                    padding: '5px',
                    margin: '2px',
                  }}
                  onDelete={handleDeleteTag(index)}
                />
              ))}
            </Box>
            <FormLabel value='AllKeywords'
              sx={{display: 'flex',
                position: 'relative',
                fontSize: '12pt',
                height: '25px',
                top: '6px',
                ml: '2px',
                mb: '4px',
              }}
            >
              Add Tags
            </FormLabel>
            <Box sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridGap: '5px',
              backgroundColor: 'rgb(255, 255, 255)',
              minHeight: '40px',
              display: 'block',
              padding: '5px',
              borderRadius: '5px',
            }}
            >
              {/* Show the all the tags here */}
              {allTags.map((tag, index) => (
                <Chip
                  label={tag}
                  key={`role${index}`}
                  id={index.toString()}
                  sx={{
                    padding: '5px',
                    margin: '2px',
                  }}
                  onClick={handleAddTag(index)}
                />
              ))}
            </Box>
          </Box>

        </Box>

        {/* RIGHT SECTION */}
        <Box>

          {/* DATE PICKERS */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                register={register}
                minDate={new Date()}
              />
              <DateInput
                name='enddate'
                control={control}
                label='End Date'
                register={register}
                minDate={new Date()}
              />
            </Box>

            {/* TIME PICKERS */}
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
                register={register}
              />
              <TimeInput
                name='endtime'
                control={control}
                label='End Time'
                register={register}
              />
            </Box>

          </LocalizationProvider>

          {/* ADDRESS */}
          {
            currLocationType != 'remote' &&
            <Box sx={{marginTop: '5px'}}>
              <TextInput
                name='eventlocation.address'
                control={control}
                label='Enter Street Address'
                register={register}
              />
              <TextInput
                name='eventlocation.city'
                control={control}
                label='Enter City'
                register={register}
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
                  register={register}
                />
                <TextInput
                  name='eventlocation.zip'
                  control={control}
                  label='Enter Zipcode'
                  register={register}
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
              register={register}
            />
          }

          <DropdownInput
            name='subject'
            control={control}
            label='Subject'
            options={subjectOptions}
            register={register}
          />
          <TextInput
            name='eventdata'
            control={control}
            label='Other details'
            register={register}
          />
        </Box>
      </Box>

      {/* Submit/Cancel Button wrapper */}
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'max-content',
          gridGap: '10px',
          justifyContent: 'end',
        }}
      >
        <ThemedButton
          aria-label='Next step button'
          color={'yellow'}
          variant={'themed'}
          onClick={onClose}
        >
          Back
        </ThemedButton>
        <ThemedButton
          aria-label='Next step button'
          color={'blue'}
          variant={'themed'}
          onClick={() => {
            console.log('SAVE CLICKED');
            // convert times to those on given days
            const values = getValues();

            const combinedStart = combineTimeDate(
                new Date(values.starttime),
                new Date(values.startdate),
            );
            setValue('starttime', combinedStart);
            setValue('startdate', combinedStart);

            const combinedEnd = combineTimeDate(
                new Date(values.endtime),
                new Date(values.enddate),
            );
            setValue('endtime', combinedEnd);
            setValue('enddate', combinedEnd);

            // manual role validation
            // ensure none are empty
            if (currRoles.includes('')) {
              setRoleError('Role name is required');
              return;
            }

            // Make sure no values written
            // to DB that do not match location/sponsor type
            if (values.locationtype == 'in-person') {
              setValue('eventzoomlink', '');
            }

            if (values.locationtype == 'remote') {
              setValue('eventlocation.zip', '');
              setValue('eventlocation.city', '');
              setValue('eventlocation.state', '');
              setValue('eventlocation.address', '');

              setValue('eventlocation', {});
            }

            if (currSponsorType == 'user sponsor') {
              setValue('organization', '');
            }

            // set curr roles in values
            setValue('roles', currRoles);

            // Convert the selected tags to an object
            const tagstToSubmit = convertTagsToObject(selectedTags);
            setValue('keywords', tagstToSubmit);

            handleSubmit(onSubmit)();
          }}
        >
          Save
        </ThemedButton>
      </Box>
    </Paper>
  );
}

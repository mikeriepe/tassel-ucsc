import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button,
  FormControl,
  StepLabel,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import AddressForm from './AddressForm';
import '../stylesheets/_OLD_OpportunityCreation.css';
import useAuth from '../util/AuthContext';

/**
 * OpportunityCreation
 * Displays the opportunity creation prompt
 * @return {HTML} opportunity creation
 */
export default function OpportunityCreation({toggle}) {
  const navigate = useNavigate();
  const {userProfile} = useAuth();

  const [opportunityTypes, setOpportunityTypes] = useState(null);
  const [organizationTypes, setOrganizationTypes] = useState(null);
  const [organizations, setOrganizations] = useState(null);

  const [newOpportunity, setNewOpportunity] = useState({
    eventname: '',
    usersponsors: {'creator': userProfile.profileid},
    locationtype: 'in-person',
    eventlocation: {},
    eventzoomlink: '',
    organization: null,
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
    roles: null,
    starttime: null,
    endtime: null,
    subject: null,
    assignedroles: {},
  });

  const [sponsorType, setSponsorType] = useState(null);

  const [roleCount, setRoleCount] = useState(0);
  const [roles, setRoles] = useState([]);
  // TODO: need error messages when trying to add over max roles
  const maxRoles = 3;

  const [triggerCreate, setTriggerCreate] = useState(false);

  const handleAdditionalRoleClick = () => {
    if (roleCount < maxRoles) {
      const newRoleCount = roleCount + 1;
      setRoleCount(newRoleCount);
      const rolesCopy = [...roles];
      rolesCopy.push('');
      console.log(rolesCopy);
      setRoles(rolesCopy);
    }
  };

  const handleRemoveRoleClick = (e) => {
    const newRoleCount = roleCount - 1;
    setRoleCount(newRoleCount);
    const rolesCopy = [...roles];
    const roleIndex = parseInt(e.target.parentElement.id, 10);
    rolesCopy.splice(roleIndex, 1);
    setRoles(rolesCopy);
  };

  const handleRoleChange = (e) => {
    const roleIndex = parseInt(e.target.id, 10);
    const rolesCopy = [...roles];
    rolesCopy[roleIndex] = e.target.value;
    setRoles(rolesCopy);
  };

  const createOpportunity = () => {
    // TODO: error check roles
    setNewOpportunity({...newOpportunity, roles: roles});
    console.log(newOpportunity);
    setTriggerCreate(true);
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
          setOpportunityTypes(json);
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
          setOrganizationTypes(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organization types');
        });
  };

  const getOrganizations = () => {
    fetch(`/api/getOrganizations/${newOpportunity.organizationtype}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setOrganizations(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organizations');
        });
  };


  useEffect(() => {
    getOrganizationTypes();
    getOpportunityTypes();
  }, []);


  useEffect(() => {
    getOrganizations();
  }, [newOpportunity.organizationtype]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewOpportunity({...newOpportunity, [name]: value});
  };

  useEffect(() => {
    console.log(newOpportunity);
    if (triggerCreate) {
      fetch(`/api/postOpportunity`, {
        method: 'POST',
        body: JSON.stringify(newOpportunity),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res;
          })
          .then((json) => {
            // TODO: should just toggle close instead of navigating to home
            toggle();
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [triggerCreate]);

  const handleSponsorChange = (e) => {
    const value = e.target.value;
    setSponsorType(value);
    if (value == 'user sponsor') {
      setNewOpportunity({...newOpportunity,
        ['organization']: null, ['organizationtype']: null});
    }
  };

  const onStartDateChange = (date) => {
    const start = date;
    setNewOpportunity({...newOpportunity,
      ['startdate']: start});
  };

  const onEndDateChange = (date) => {
    const end = date;
    setNewOpportunity({...newOpportunity,
      ['enddate']: end});
  };

  const onStarttimeChange = (time) => {
    console.log(time);
    setNewOpportunity({...newOpportunity,
      ['starttime']: time});
  };

  const onEndtimeChange = (time) => {
    setNewOpportunity({...newOpportunity,
      ['endtime']: time});
  };

  return (
    <div>
      <Paper
        className='opportunity-creation'
        elevation={3}
        sx={{
          // display: 'flex',
          position: 'fixed',
          top: '3vh',
          right: '16vw',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: '3rem',
          // width: '70vw',
          minHeight: '870px',
          height: 'auto',
          maxHeight: '700px',
          zIndex: '10',
          boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
          borderRadius: '10px',
          backgroundColor: 'rgb(240, 240, 240)',
        }} >

        <StepLabel
          sx={{display: 'flex',
            position: 'relative',
            alignSelf: 'start',
            right: '110px',
            marginLeft: '20px',
            top: '20px',
            color: 'darkgray',
            opacity: '50%'}}>
        New Opportunity
        </StepLabel>


        <FormControl
          sx={{display: 'flex', position: 'relative',
            /* width: '50vw'*/}}>

          <div className='opportunity-creation__name'>
            <FormLabel name='eventname' value='eventname' id='name'
              sx={{'display': 'flex',
                'position': 'relative',
                'fontSize': '20pt',
                'top': '17px',
              }}>
              Title:
            </FormLabel>
            <TextField
              sx={{position: 'relative',
                left: '20px',
                top: '5px',
                width: '600px',
                height: '55px',
                input: {color: '#fdc700'},
                backgroundColor: 'rgb(255, 255, 255)',
              }}
              label='Opportunity Title'
              name='eventname'
              value={newOpportunity.eventname}
              onChange={handleChange}
            />
          </div>


          <div className='opportunity-creation__opportunity-type'>
            <TextField
              value={newOpportunity.opportunitytype}
              defaultValue={null}
              name='opportunitytype'
              select
              label='Opportunity Type'
              onChange={handleChange}
              sx={{backgroundColor: 'rgb(255, 255, 255)',
                display: 'inline-flex',
                position: 'relative',
                right: '215px',
                top: '50px',
                mt: '25px',
                width: '325px',
                marginBottom: '10px',
              }}
            >
              {
                opportunityTypes ?
                opportunityTypes.map((type, index) => (
                  <MenuItem value={type.name} key={index}>
                    {type.name}
                  </MenuItem>
                )) :
                <Skeleton variant="rectangular" width={325} height={26} />
              }
            </TextField>
          </div>


          <div className='opportunity-creation__locationtype'>
            <TextField
              value={newOpportunity.locationtype}
              defaultValue='in-person'
              name='locationtype'
              select
              label='Location Type'
              onChange={handleChange}
              sx={{backgroundColor: 'rgb(255, 255, 255)',
                display: 'flex',
                position: 'relative',
                left: '140px',
                bottom: '16px',
                width: '325px',
                marginBottom: '10px',
              }}
            >
              <MenuItem value='remote'>
                Remote
              </MenuItem>
              <MenuItem value='in-person'>
                In-Person
              </MenuItem>
              <MenuItem value='hybrid'>
                Hybrid
              </MenuItem>
            </TextField>
          </div>


          <div className='opportunity-creation__sponsor'>
            <FormLabel name='sponsor' value='sponsor' id='sponsorlabel'
              sx={{display: 'flex',
                position: 'relative',
                fontSize: '16pt',
                marginRight: '20px',
                top: '17px',
              }}>
              Opportunity Sponsor:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="sponsorlabel"
              defaultValue="user sponsor"
              sx={{position: 'relative', top: '3px'}}
              onChange={handleSponsorChange}
            >
              <FormControlLabel
                value="user sponsor"
                control={<Radio />}
                label="User Sponsored"
              />
              <FormControlLabel
                value="organization sponsor"
                control={<Radio />}
                label="Organization Sponsored"
              />
            </RadioGroup>
          </div>


          {sponsorType == 'organization sponsor' &&
          <div className='opportunity-creation__organization-type'>
            <TextField
              value={newOpportunity.organizationtype}
              defaultValue=''
              name='organizationtype'
              select
              label='Organization Type'
              onChange={handleChange}
              sx={{backgroundColor: 'rgb(255, 255, 255)',
                display: 'flex',
                position: 'relative',
                right: '215px',
                bottom: '30px',
                mt: '10px',
                width: '300px',
                marginBottom: '10px',
              }}
            >
              {organizationTypes && organizationTypes.map((orgType, index) => (
                <MenuItem value={orgType.name} key={index}>
                  {orgType.name}
                </MenuItem>
              ))}
            </TextField>
          </div>}


          {sponsorType == 'organization sponsor' &&
          <TextField
            value={newOpportunity.organization}
            defaultValue=''
            name='organization'
            select
            label='Organization'
            onChange={handleChange}
            sx={{backgroundColor: 'rgb(255, 255, 255)',
              display: 'flex',
              position: 'relative',
              right: '215px',
              bottom: '30px',
              mt: '10px',
              width: '600px',
              marginBottom: '10px',
            }}
          >
            {organizations && organizations.map((org, index) => (
              <MenuItem value={org.name} key={index}>
                {org.name}
              </MenuItem>
            ))}
          </TextField>}


          <div className='opportunity-creation__description'>
            <TextField multiline
              rows={5}
              name='description'
              label='Enter Description'
              value={newOpportunity.description}
              onChange={handleChange}
              sx={{display: 'flex',
                position: 'relative',
                right: '215px',
                bottom: '25px',
                width: '680px',
                height: 'auto',
                backgroundColor: 'rgb(255, 255, 255)',
              }}
            />
          </div>


          <div className='opportunity-creation__roles'>
            <div className='opportunity-creation__roles-header'>
              <FormLabel className='roles' value='eventroles' id='roles'
                sx={{display: 'flex',
                  position: 'relative',
                  fontSize: '12pt',
                  height: '25px',
                  top: '6px',
                  ml: '2px',
                }}>
                Opportunity Roles
              </FormLabel>
              <IconButton
                size='small'
                sx = {{color: '#fdc700'}}
                aria-label="additional opportunity role"
                onClick={handleAdditionalRoleClick}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
            {
              roles.length > 0 &&
              roles.map((role, index) => (
                <div
                  className='opportunity-creation__additional-role-input'
                  key={`role${index}`}
                  id={index.toString()}
                >
                  <TextField
                    sx={{display: 'flex',
                      position: 'relative',
                      marginTop: '10px',
                      width: '600px',
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}
                    name={`role${index}`}
                    id={index.toString()}
                    value={role}
                    onChange={handleRoleChange}
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
                </div>
              ))
            }
          </div>


          <div className='opportunity-creation__details-section'>
            <div className='opportunity-creation__details-header'>
              <h4>Details</h4>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className='datetime-row'>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  name='startdate'
                  value={newOpportunity.startdate}
                  onChange={onStartDateChange}
                  renderInput={(params) => <TextField {...params}
                    sx={{width: '150px',
                      display: 'flex',
                      position: 'relative',
                      mr: '5px',
                    }}/>}
                />
                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  name='enddate'
                  value={newOpportunity.enddate}
                  onChange={onEndDateChange}
                  renderInput={(params) => <TextField {...params}
                    sx={{width: '150px',
                      display: 'flex',
                      position: 'relative',
                    }}/>}
                />
              </div>
              <div className='datetime-row'>
                <TimePicker
                  label="Start time"
                  timeFormat="HH:mm"
                  value={newOpportunity.starttime}
                  name='starttime'
                  onChange={onStarttimeChange}
                  renderInput={(params) => <TextField {...params}
                    sx={{width: '150px',
                      display: 'flex',
                      position: 'relative',
                      mr: '5px',
                    }}/>}
                />
                <TimePicker
                  label="End time"
                  timeFormat="HH:mm"
                  value={newOpportunity.endtime}
                  name='endtime'
                  onChange={onEndtimeChange}
                  renderInput={(params) => <TextField {...params}
                    sx={{width: '150px',
                      display: 'flex',
                      position: 'relative',
                    }}/>}
                />
              </div>
            </LocalizationProvider>

            <div className='location-details'>
              {newOpportunity.locationtype == 'in-person' &&
                <AddressForm
                  newOpportunity={newOpportunity}
                  setNewOpportunity={setNewOpportunity} />}

              {newOpportunity.locationtype == 'remote' &&
                <TextField
                  name='eventzoomlink'
                  label='Enter locationtype Meeting Link'
                  value={newOpportunity.eventzoomlink}
                  onChange={handleChange}
                  sx={{display: 'flex',
                    width: '305px',
                    height: 'auto',
                    backgroundColor: 'rgb(255, 255, 255)',
                  }}
                />}


              {newOpportunity.locationtype == 'hybrid' &&
              <div>
                <AddressForm
                  newOpportunity={newOpportunity}
                  setNewOpportunity={setNewOpportunity}/>
                <TextField
                  name='eventzoomlink'
                  label='Enter locationtype Meeting Link'
                  value={newOpportunity.eventzoomlink}
                  onChange={handleChange}
                  sx={{display: 'flex',
                    position: 'relative',
                    width: '305px',
                    height: 'auto',
                    mt: '10px',
                    backgroundColor: 'rgb(255, 255, 255)',
                  }}
                />
              </div>}
            </div>

            <div className='subject'>
              <TextField
                defaultValue=''
                name='subject'
                select
                label='Event subject'
                onChange={handleChange}
                sx={{backgroundColor: 'rgb(255, 255, 255)',
                  display: 'flex',
                  width: '305px',
                }}
              >
                <MenuItem value='computer science'>
                  Computer Science
                </MenuItem>
                <MenuItem value='computer engineering'>
                  Computer Engineering
                </MenuItem>
                <MenuItem value='art'>
                  Art
                </MenuItem>
              </TextField>
            </div>

            <div className='opportunity-creation__other'>
              <TextField multiline
                rows={5}
                name='eventdata'
                label='Other details'
                value={newOpportunity.eventdata}
                onChange={handleChange}
                sx={{display: 'flex',
                  position: 'relative',
                  width: '305px',
                  height: 'auto',
                  backgroundColor: 'rgb(255, 255, 255)',
                }}
              />
            </div>
            <div className='opportunity-creation__creation-buttons'>
              <Button onClick={toggle}
                sx={{
                  display: 'flex',
                  position: 'relative',
                  width: '100px',
                  height: '50px',
                  marginRight: '5px',
                  backgroundColor: 'gray',
                  fontSize: '8pt',
                }}>
                Cancel
              </Button>
              <Button onClick={createOpportunity}
                sx={{
                  display: 'flex',
                  position: 'relative',
                  width: '100px',
                  height: '50px',
                  backgroundColor: '#fdc700',
                  fontSize: '8pt',
                }}>
                Create Opportunity
              </Button>
            </div>


          </div>
        </FormControl>
      </Paper>
    </div>
  );
}

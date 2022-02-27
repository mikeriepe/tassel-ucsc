import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {FormControl} from '@mui/material';
import {StepLabel} from '@mui/material';
import {IconButton} from '@mui/material';
import {RadioGroup} from '@mui/material';
import {Radio} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {MenuItem} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import '../stylesheets/OpportunityCreation.css';
import useAuth from '../util/AuthContext';
/**
 * OpportunityCreation
 * Displays the opportunity creation prompt
 * @return {HTML} opportunity creation
 */
export default function OpportunityCreation({toggle}) {
  const navigate = useNavigate();
  const {userProfile} = useAuth();

  const [newOpportunity, setNewOpportunity] = useState({
    eventname: '',
    usersponsors: {'creator': userProfile.profileid},
    remote: null,
    eventlocation: '',
    eventzoomlink: 'https://zoom.com/link',
    organization: null,
    description: null,
    userparticipants: [userProfile.profileid],
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

  });

  const [additionalRole, setAdditionalRole] = useState(0);
  const [sponsorType, setSponsorType] = useState(null);
  const [opportunityTypes, setOpportunityTypes] = useState(null);
  const [organizationTypes, setOrganizationTypes] = useState(null);
  const [organizations, setOrganizations] = useState(null);

  const handleAdditionalRoleClick = () => {
    if (additionalRole < 2) {
      setAdditionalRole(additionalRole+1);
    }
  };

  const handleRemoveRoleClick = () => {
    if (additionalRole > 0) {
      setAdditionalRole(additionalRole-1);
    }
  };

  const createOpportunity = () => {
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
          console.log(res);
          return res;
        })
        .then((json) => {
          console.log(json);
          navigate(`/`);
        })
        .catch((error) => {
          console.log(error);
        });
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
          console.log(json);
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
          console.log(json);
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
          console.log(json);
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
    console.log(e.target.name);
    console.log(e.target.value);
    const {name, value} = e.target;
    setNewOpportunity({...newOpportunity, [name]: value});
  };

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
          display: 'flex',
          position: 'fixed',
          top: '10vh',
          right: '17vw',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: '3rem',
          width: '70vw',
          minHeight: '800px',
          height: 'auto',
          maxHeight: '700px',
          zIndex: '10',
          boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
          borderRadius: '10px',
          backgroundColor: 'rgb(240, 240, 240)',
        }}>

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
            width: '50vw'}}>

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
              {opportunityTypes && opportunityTypes.map((type, index) => (
                <MenuItem value={type.name} key={index}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </div>


          <div className='opportunity-creation__remote'>
            <TextField
              value={newOpportunity.remote}
              defaultValue={null}
              name='remote'
              select
              label='Remote or In-Person'
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
              <MenuItem value={true}>
                Remote
              </MenuItem>
              <MenuItem value={false}>
                In-Person
              </MenuItem>
              <MenuItem value={null} placeholder='Hybrid'>
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
            <TextField
              sx={{display: 'flex',
                position: 'relative',
                width: '600px',
                backgroundColor: 'rgb(255, 255, 255)',
              }}
              label='New Role'
            />

            {additionalRole >= 1 &&
            <div className='opportunity-creation__additional-role-input'>
              <TextField
                sx={{display: 'flex',
                  position: 'relative',
                  marginTop: '10px',
                  width: '600px',
                  backgroundColor: 'rgb(255, 255, 255)',
                }}
              />
              <IconButton
                aria-label="remove opportunity role"
                color="inherit"
                sx = {{position: 'relative',
                  marginTop: '12px',
                  marginLeft: '5px'}}
                onClick={handleRemoveRoleClick}
              >
                <RemoveCircleOutlineIcon sx={{color: 'red'}} fontSize="large"/>
              </IconButton>
            </div>}

            {additionalRole >= 2 &&
            <div className='opportunity-creation__additional-role-input'>
              <TextField
                sx={{display: 'flex',
                  position: 'relative',
                  marginTop: '10px',
                  width: '600px',
                  backgroundColor: 'rgb(255, 255, 255)',
                }}
              />
              <IconButton
                aria-label="remove opportunity role"
                color="inherit"
                sx = {{position: 'relative',
                  marginTop: '12px',
                  marginLeft: '5px'}}
                onClick={handleRemoveRoleClick}
              >
                <RemoveCircleOutlineIcon sx={{color: 'red'}} fontSize="large"/>
              </IconButton>
            </div>}
          </div>


          <div className='opportunity-creation__details-section'>
            <div className='opportunity-creation__details-header'>
              <h4>Details</h4>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div>
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
                      mt: '70px',
                      mb: '15px',
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
                      ml: '155px',
                      bottom: '71px',
                    }}/>}
                />
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
                      bottom: '50px',
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
                      bottom: '106px',
                      left: '155px',
                    }}/>}
                />
              </div>
            </LocalizationProvider>


            <div className='opportunity-creation__creation-buttons'>
              <Button onClick={toggle}
                sx={{
                  display: 'flex',
                  position: 'relative',
                  width: '100px',
                  top: '50px',
                  right: '80px',
                  height: '50px',
                  backgroundColor: 'gray',
                }}>
                Cancel
              </Button>
              <Button onClick={createOpportunity}
                sx={{
                  display: 'flex',
                  position: 'relative',
                  width: '150px',
                  bottom: '0px',
                  left: '40px',
                  height: '50px',
                  backgroundColor: '#fdc700',
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

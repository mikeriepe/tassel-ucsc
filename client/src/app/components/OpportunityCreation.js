import * as React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {FormControl} from '@mui/material';
import {StepLabel} from '@mui/material';
import {InputLabel} from '@mui/material';
import {IconButton} from '@mui/material';
import {RadioGroup} from '@mui/material';
import {Radio} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
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
    eventname: 'Test Opportunity 2/22/2022 attempt 2',
    usersponsors: {'creator': userProfile.profileid},
    remote: true,
    eventlocation: '',
    eventzoomlink: 'https://zoom.com/link',
    organization: '',
    description: 'Test # 10',
    eventtype: null,
    userparticipants: [userProfile.profileid],
    preferences: null,
    eventdata: null,
    startdate: {'startdate': '02/22/2022', 'starttime': '3:30 PM'},
    enddate: {'enddate': '', 'endtime': '6:30 PM'},
    active: true,
    // eslint-disable-next-line max-len
    eventbanner: 'https://www.sorenkaplan.com/wp-content/uploads/2017/07/Testing.jpg',
  });

  const [additionalRole, setAdditionalRole] = useState(0);

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

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewOpportunity({...newOpportunity, [name]: value});
  };


  return (
    <div>
      <Paper
        className='opportunity-creation'
        elevation={3}
        sx={{
          display: 'flex',
          position: 'fixed',
          top: '15vh',
          right: '17vw',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: '3rem',
          width: '65vw',
          minHeight: '700px',
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
            right: '65px',
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
            <InputLabel name='eventname' value='eventname'
              sx={{display: 'flex',
                position: 'relative',
                fontSize: '20pt',
              }}>
              Title:
            </InputLabel>

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

          <FormControl>
            <div className='opportunity-creation__sponsor'>
              <InputLabel name='sponsor' value='sponsor'
                sx={{display: 'flex',
                  position: 'relative',
                  fontSize: '16pt',
                  marginRight: '20px',
                }}>
                Opportunity Sponsor:
              </InputLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                defaultValue="user sponsor"
                name="organization"
                indicatorColor='secondary'
                sx={{position: 'relative', top: '3px'}}
                value={newOpportunity.organization}
                onChange={handleChange}
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
          </FormControl>


          {newOpportunity.organization == 'organization sponsor' && <Select
            value={newOpportunity.organization}
            name='organization'
            label='Select an Organization'
            sx={{backgroundColor: 'rgb(255, 255, 255)',
              display: 'flex',
              position: 'relative',
              right: '80px',
              top: '80px',
              width: '600px',
              marginBottom: '10px',
            }}
            onChange={handleChange}
          >
            <MenuItem value='BSOE'>Baskin School of Engineering</MenuItem>
            <MenuItem value='Student Buisness Services'>
              Student Buisness Services
            </MenuItem>
            <MenuItem value='Ethnic Resource Center'>
              Ethnic Resource Center
            </MenuItem>
          </Select>}

          <div className='opportunity-creation__description'>
            <TextField multiline
              rows={6}
              sx={{display: 'flex',
                position: 'relative',
                right: '160px',
                marginTop: '80px',
                width: '680px',
                height: 'auto',
                backgroundColor: 'rgb(255, 255, 255)',
              }}
              label='Enter Description'
            />
          </div>


          <div className='opportunity-creation__roles'>

            <div className='opportunity-creation__roles-header'>
              <InputLabel className='roles' value='eventroles' id='roles'
                sx={{display: 'flex',
                  position: 'relative',
                  fontSize: '12pt',
                  height: '25px',
                }}>
                Opportunity Roles
              </InputLabel>
              <IconButton
                size='small'
                labelId=''
                sx = {{position: 'relative',
                  color: '#fdc700',
                  left: '20px',
                  top: '11px'}}
                aria-label="additional opportunity role"
                onClick={handleAdditionalRoleClick}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
            <TextField
              sx={{display: 'flex',
                position: 'relative',
                left: '15px',
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
                  left: '15px',
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
                  marginLeft: '20px'}}
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
                  left: '15px',
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
                  marginLeft: '20px'}}
                onClick={handleRemoveRoleClick}
              >
                <RemoveCircleOutlineIcon sx={{color: 'red'}} fontSize="large"/>
              </IconButton>
            </div>}

          </div>

          <div className='opportunity-creation__details-section'>
            <div className='opportunity-creation__details-header'>
              <h3>Details</h3>
            </div>
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

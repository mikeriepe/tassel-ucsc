import * as React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {FormControl} from '@mui/material';
import {StepLabel} from '@mui/material';
import {InputLabel} from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import '../stylesheets/Opportunities.css';
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
    eventbanner: 'data:image/jpeg;base64,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',
  });

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

          <div className='eventname'>
            <InputLabel name='eventname' value='eventname'
              sx={{display: 'flex',
                position: 'relative',
                fontSize: '20pt',
              }}>
              Title:
            </InputLabel>

            <TextField
              sx={{display: 'flex',
                position: 'relative',
                left: '20px',
                top: '5px',
                width: '600px',
              }}
              label='Enter Opportunity Title'
              name='eventname'
              value={newOpportunity.eventname}
              onChange={handleChange}
            />
          </div>

          <div className='organization'>
            <TextField
              sx={{display: 'flex',
                position: 'relative',
                right: '80px',
                top: '135px',
                width: '600px',
              }}
              label='Enter Organization'
            />
          </div>

          <div className='description'>
            <TextField multiline
              rows={6}
              sx={{display: 'flex',
                position: 'relative',
                right: '160px',
                top: '160px',
                width: '680px',
                height: 'auto',
              }}
              label='Enter Description'
            />
          </div>


          <div className='eventroles'>
            <InputLabel name='eventroles' value='eventroles'
              sx={{display: 'flex',
                position: 'relative',
                fontSize: '12pt',
              }}>
              Opportunity Roles
            </InputLabel>

            <TextField
              sx={{display: 'flex',
                position: 'relative',
                left: '15px',
                top: '25px',
                width: '680px',
              }}
              label='New Role'
            />
            <TextField
              sx={{display: 'flex',
                position: 'relative',
                left: '15px',
                top: '25px',
                marginTop: '10px',
                width: '680px',
              }}
            />
            <TextField
              sx={{display: 'flex',
                position: 'relative',
                left: '15px',
                top: '25px',
                marginTop: '10px',
                width: '680px',
              }}
            />
          </div>

          <div className='details'>
            <div className='creationbuttons'>
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
                  backgroundColor: 'gold',
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

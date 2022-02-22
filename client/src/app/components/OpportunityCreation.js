import * as React from 'react';
import {useState} from 'react';
import {Button} from '@mui/material';
import {FormControl} from '@mui/material';
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
  const {userProfile} = useAuth();

  const newOpportunity = useState({
    eventname: 'Test Opportunity 7',
    usersponsors: {'creator': userProfile.profileid},
    remote: null,
    eventlocation: '',
    eventzoomlink: '',
    organization: '',
    description: '',
    eventtype: null,
    userparticipants: null,
    preferences: null,
    eventdata: null,
    startdate: null,
    enddate: null,
    active: true,
    eventbanner: '',
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
          return res.json();
        })
        .then((json) => {
          console.log(json);
          toast.success('Opportunity created', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate(`/`);
        });
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
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: '3rem',
          width: '50vw',
          minHeight: '700px',
          height: 'auto',
          maxHeight: '1000px',
          zIndex: '10',
          boxShadow: '-3px 5px 8px 0px rgba(84, 84, 84, 0.81)',
          borderRadius: '10px',
        }}>
        <FormControl
          sx={{display: 'flex', position: 'relative',
            width: '50vw'}}>
          <InputLabel name='eventname' value='eventname'
            sx={{display: 'flex', position: 'relative',
              height: '100px', justifyContent: 'center'}}>
            Title: <TextField />
          </InputLabel>
          <Button onClick={toggle}
            sx={{
              display: 'flex',
              position: 'relative',
              width: '100px',
              alignSelf: 'end',
              top: '520px',
              right: '160px',
              marginRight: '5px',
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
              alignSelf: 'end',
              top: '470px',
              right: '10px',
              marginLeft: '5px',
              height: '50px',
              backgroundColor: 'gold',
            }}>
            Create Opportunity
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
}

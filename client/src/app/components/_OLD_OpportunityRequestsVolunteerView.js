import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {MenuItem} from '@mui/material';
import useAuth from '../util/AuthContext';
import '../stylesheets/OpportunityRequests.css';

/**
 * OpportunityRequestsCreatorView
 * Displays the opportunity creator view for an opportunitues request page
 * @return {html} opportunity requests creator view
 */
export default function OpportunityRequestsVolunteerView({data}) {
  const {userProfile} = useAuth();
  const [pendingRequest, setPendingRequest] = useState(null);
  const [request, setRequest] = useState({
    requestee: data.usersponsors.creator,
    requester: userProfile.profileid,
    requestmessage: null,
    opportunityid: data.eventid,
    role: null,
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const {name, value} = e.target;
    setRequest({...request, [name]: value});
  };

  const createRequest = () => {
    fetch(`/api/postRequest`, {
      method: 'POST',
      body: JSON.stringify(request),
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
          getPendingRequest();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const cancelRequest = () => {
    fetch(`/api/cancelRequest`, {
      method: 'POST',
      body: JSON.stringify(pendingRequest),
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
          setPendingRequest(null);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const getPendingRequest = () => {
    fetch(`/api/getPendingRequest/${userProfile.profileid}/${data.eventid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setPendingRequest(json);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getPendingRequest();
  }, []);

  const formatDate = (date) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(date).toLocaleTimeString([], timeOptions);

    return {date: convertDate, time: convertTime};
  };

  return (
    <>
      {pendingRequest && <Paper
        className='opportunity-requests'
        elevation={3}
        sx={{
          display: 'flex',
          marginBottom: '3rem',
          marginTop: '3rem',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '60vw',
          marginX: 'auto',
          height: 'auto',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <>
          <div className='request-header'>
            Pending Request
          </div>
          <div className='request-details'>
            <div className='request-message'>
              Message: {pendingRequest.requestmessage}
            </div>
            <div className='request-status'>
              Status: {pendingRequest.requeststatus}
            </div>
            <div className='request-role'>
              Requested Role: {pendingRequest.role}
            </div>
            <div className='request-date'>
              Date Requested:  {pendingRequest.requestdatetime &&
              formatDate(pendingRequest.requestdatetime).date + ' - ' +
              formatDate(pendingRequest.requestdatetime).time}
            </div>
          </div>
          <Button sx={{padding: '2rem',
            marginTop: '1rem'}}
          onClick={cancelRequest}>
            Cancel Request
          </Button>
        </>
      </Paper>}
      {pendingRequest === null && <Paper
        className='opportunity-requests'
        elevation={3}
        sx={{
          display: 'flex',
          marginBottom: '3rem',
          marginTop: '3rem',
          justifyContent: 'center',
          flexDirection: 'column',
          marginX: 'auto',
          width: '60vw',
          height: 'auto',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <>
          <div className='request-header'>
            Request to volunteer for this opportunity
          </div>
          <TextField multiline
            rows={5}
            name='requestmessage'
            label='Request Message'
            value={request.requestmessage}
            onChange={handleChange}
            sx={{display: 'flex',
              marginX: 'auto',
              width: '90%',
              marginTop: '2rem',
              height: 'auto',
            }}
          />
          {data.roles && <TextField select
            name='role'
            label='Role'
            value={request.role}
            onChange={handleChange}
            sx={{display: 'flex',
              marginX: 'auto',
              width: '40%',
              marginTop: '2rem',
              height: 'auto',
            }}
          >
            {data.roles.map((role, index) => (
              <MenuItem value={role} key={index}>
                {role}
              </MenuItem>
            ))}
          </TextField>}
          <Button sx={{padding: '2rem',
            marginTop: '1rem'}}
          onClick={createRequest}>
            Send Request
          </Button>
        </>
      </Paper>}
    </>
  );
}

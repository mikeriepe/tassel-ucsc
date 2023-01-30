import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import useAuth from '../util/AuthContext';
import {useNavigate} from 'react-router-dom';
import {CardActionArea, CardActions, CardContent} from '@mui/material';
import {Avatar} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import '../stylesheets/RequestCard.css';

/**
 * RequestCard
 * returns a card filled with details regarding a request
 * and actions that may be taken on that request
 * @return {html} RequestCard component
 */
export default function RequestCard({request, data}) {
  const navigate = useNavigate();
  const {userProfile} = useAuth();
  const [requester, setRequester] = useState(null);
  const [requestee, setRequestee] = useState(null);

  const getRequester = () => {
    fetch(`/api/getProfileByProfileId/${request.requester}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setRequester(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving requester profile, please try again');
        });
  };

  const getRequestee = () => {
    fetch(`/api/getProfileByProfileId/${request.requestee}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setRequestee(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving requestee profile, please try again');
        });
  };

  React.useEffect(() => {
    getRequester();
    getRequestee();
  }, []);

  const approveRequest = () => {
    fetch(`/api/approveRequest`, {
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
          // TODO
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const rejectRequest = () => {
    fetch(`/api/rejectRequest`, {
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
          // TODO
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const cancelRequest = () => {
    fetch(`/api/cancelRequest`, {
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
          // TODO
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleClickRequester = (e) => {
    navigate(`/profile/${request.requester}`);
  };

  const handleClickRequestee = (e) => {
    navigate(`/profile/${request.requestee}`);
  };

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
    <Card sx={{display: 'flex', width: '95%', marginX: 'auto',
      marginTop: '1rem', marginBottom: '1rem',
      flexDirection: 'column'}}>

      {userProfile.profileid && request.requestee &&
      userProfile.profileid == request.requestee &&
      request.requeststatus == 'pending' &&
      <>
        <CardContent sx={{display: 'flex', width: '100%',
          flexDirection: 'column', cursor: 'pointer'}}
        onClick={handleClickRequester}>
          <div className='request-detail'>
            {requester && requester !== null &&
              <div className='requester'>
                <div className='requester-avatar'>
                  <Avatar
                    src={requester.profilepicture}
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
                <div className='requester-name'>
                  <h3>{requester.firstname + ' ' + requester.lastname}</h3>
                </div>
                <div className='requester-major'>
                  Bachelor of Science, {requester.major}
                </div>
                <div className='requester-year'>
                  Class of {requester.graduationyear}
                </div>
              </div>
            }
          </div>
          <div className='request-detail'>
            Request message: {request.requestmessage}
          </div>
          <div className='request-detail'>
            Request date time: {request.requestdatetime &&
            formatDate(request.requestdatetime).date + ' ' +
            formatDate(request.requestdatetime).time}
          </div>
          <div className='request-detail'>Role: {request.role}</div>
        </CardContent>

        <CardActions sx={{display: 'flex', width: '100%',
          flexDirection: 'row', cursor: 'pointer'}}>
          <CardActionArea sx={{display: 'flex', height: '100%',
            marginX: 'auto', width: '50%'}}
          onClick={approveRequest}>
            <CheckCircleIcon sx={{color: 'green'}} fontSize="large" />
            Approve
          </CardActionArea>
          <CardActionArea sx={{display: 'flex', height: '100%',
            marginX: 'auto', width: '50%'}}
          onClick={rejectRequest}>
            <ClearIcon sx={{color: 'red'}} fontSize="large" />
            Reject
          </CardActionArea>
        </CardActions>
      </>}

      {userProfile.profileid && request.requester &&
      userProfile.profileid == request.requester &&
      request.requeststatus == 'pending' &&
      <>
        <CardContent sx={{display: 'flex', width: '100%',
          flexDirection: 'column', cursor: 'pointer'}}
        onClick={handleClickRequestee}>
          <div className='request-detail'>
            {requestee && requestee !== null &&
              <div className='requestee'>
                <div className='requestee-avatar'>
                  <Avatar
                    src={requestee.profilepicture}
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
                <div className='requestee-name'>
                  <h3>{requestee.firstname + ' ' + requestee.lastname}</h3>
                </div>
                <div className='requestee-major'>
                  Bachelor of Science, {requestee.major}
                </div>
                <div className='requestee-year'>
                  Class of {requestee.graduationyear}
                </div>
              </div>
            }
          </div>
          <div className='request-detail'>
            Request message: {request.requestmessage}
          </div>
          <div className='request-detail'>
            Request date time: {request.requestdatetime &&
            formatDate(request.requestdatetime).date + ' ' +
            formatDate(request.requestdatetime).time}
          </div>
          <div className='request-detail'>
            Role: {request.role}
          </div>
        </CardContent>
        <CardActions sx={{display: 'flex', width: '97.5%',
          flexDirection: 'row'}}>
          <CardActionArea sx={{display: 'flex', height: '100%',
            marginX: 'auto', width: '100%'}}
          onClick={cancelRequest}>
            <RemoveCircleIcon sx={{color: 'red'}} fontSize="large"/>
            Cancel Request
          </CardActionArea>
        </CardActions>
      </>}

      {request && request.requeststatus &&
      request.requeststatus == 'approved' &&
      request.requester != userProfile.profileid &&
      <>
        <CardContent sx={{display: 'flex', width: '100%',
          flexDirection: 'column', cursor: 'pointer'}}
        onClick={handleClickRequester}>
          <div className='request-detail'>
            {requester && requester !== null &&
              <div className='requester'>
                <div className='requester-avatar'>
                  <Avatar
                    src={requester.profilepicture}
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
                <div className='requester-name'>
                  <h3>{requester.firstname + ' ' + requester.lastname}</h3>
                </div>
                <div className='requester-major'>
                  Bachelor of Science, {requester.major}
                </div>
                <div className='requester-year'>
                  Class of {requester.graduationyear}
                </div>
              </div>
            }
          </div>
          <div className='request-detail'>
            Request message: {request.requestmessage}
          </div>
          <div className='request-detail'>
            Response date time: {request.responsedatetime &&
            formatDate(request.responsedatetime).date + ' ' +
            formatDate(request.responsedatetime).time}
          </div>
          <div className='request-detail'>
            Role: {request.role}
          </div>
        </CardContent>
      </>}

      {request && request.requeststatus &&
      request.requeststatus == 'approved' &&
      request.requester == userProfile.profileid &&
      <>
        <CardContent sx={{display: 'flex', width: '100%',
          flexDirection: 'column', cursor: 'pointer'}}
        onClick={handleClickRequestee}>
          <div className='request-detail'>
            {requestee && requestee !== null &&
              <div className='requestee'>
                <div className='requestee-avatar'>
                  <Avatar
                    src={requestee.profilepicture}
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
                <div className='requestee-name'>
                  <h3>{requestee.firstname + ' ' + requestee.lastname}</h3>
                </div>
                <div className='requestee-major'>
                  Bachelor of Science, {requestee.major}
                </div>
                <div className='requestee-year'>
                  Class of {requestee.graduationyear}
                </div>
              </div>
            }
          </div>
          <div className='request-detail'>
            Request message: {request.requestmessage}
          </div>
          <div className='request-detail'>
            Response date time: {request.responsedatetime &&
            formatDate(request.responsedatetime).date + ' ' +
            formatDate(request.responsedatetime).time}
          </div>
          <div className='request-detail'>
            Role: {request.role}
          </div>
        </CardContent>
      </>}

      {request && request.requeststatus &&
      request.requeststatus == 'rejected' &&
      request.requester != userProfile.profileid &&
      <>
        <CardContent sx={{display: 'flex', width: '100%',
          flexDirection: 'column'}}
        onClick={handleClickRequester}>
          <div className='request-detail'>
            {requester && requester !== null &&
              <div className='requester'>
                <div className='requester-avatar'>
                  <Avatar
                    src={requester.profilepicture}
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
                <div className='requester-name'>
                  <h3>{requester.firstname + ' ' + requester.lastname}</h3>
                </div>
                <div className='requester-major'>
                  Bachelor of Science, {requester.major}
                </div>
                <div className='requester-year'>
                  Class of {requester.graduationyear}
                </div>
              </div>
            }
          </div>
          <div className='request-detail'>
            Request message: {request.requestmessage}
          </div>
          <div className='request-detail'>
            Response date time: {request.responsedatetime &&
            formatDate(request.responsedatetime).date + ' ' +
            formatDate(request.responsedatetime).time}
          </div>
          <div className='request-detail'>
            Role: {request.role}
          </div>
        </CardContent>
      </>}

      {request && request.requeststatus &&
      request.requeststatus == 'rejected' &&
      request.requester == userProfile.profileid &&
      <>
        <CardContent sx={{display: 'flex', width: '100%',
          flexDirection: 'column'}}
        onClick={handleClickRequestee}>
          <div className='request-detail'>
            {requestee && requestee !== null &&
              <div className='requestee'>
                <div className='requestee-avatar'>
                  <Avatar
                    src={requestee.profilepicture}
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
                <div className='requestee-name'>
                  <h3>{requestee.firstname + ' ' + requestee.lastname}</h3>
                </div>
                <div className='requestee-major'>
                  Bachelor of Science, {requestee.major}
                </div>
                <div className='requestee-year'>
                  Class of {requestee.graduationyear}
                </div>
              </div>
            }
          </div>
          <div className='request-detail'>
            Request message: {request.requestmessage}
          </div>
          <div className='request-detail'>
            Response date time: {request.responsedatetime &&
            formatDate(request.responsedatetime).date + ' ' +
            formatDate(request.responsedatetime).time}
          </div>
          <div className='request-detail'>
            Role: {request.role}
          </div>
        </CardContent>
      </>}
    </Card>
  );
}

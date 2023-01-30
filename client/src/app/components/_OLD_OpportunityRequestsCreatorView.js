import * as React from 'react';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import RequestCard from './RequestCard';
import useAuth from '../util/AuthContext';
import '../stylesheets/OpportunityRequests.css';

/**
 * OpportunityRequestsCreatorView
 * Displays the opportunity creator view for an opportunitues request page
 * @return {html} opportunity requests creator view
 */
export default function OpportunityRequestsCreatorView({data}) {
  const {userProfile} = useAuth();
  const [pendingRequestsSent, setPendingRequestsSent] = useState(null);
  const [pendingRequestsReceived, setPendingRequestsReceived] = useState(null);
  const [approvedRequests, setApprovedRequests] = useState(null);
  const [rejectedRequests, setRejectedRequests] = useState(null);

  const getPendingRequestsSent = () => {
    fetch(
        `/api/getPendingRequestsSent/${userProfile.profileid}/${data.eventid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setPendingRequestsSent(json);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getPendingRequestsReceived = () => {
    fetch(`/api/getPendingRequestsReceived/` +
    `${userProfile.profileid}/${data.eventid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setPendingRequestsReceived(json);
        })
        .catch((err) => {
          console.log(err);
        });
  };


  const getApprovedRequests = () => {
    fetch(`/api/getApprovedRequests/` +
    `${userProfile.profileid}/${data.eventid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setApprovedRequests(json);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getRejectedRequests = () => {
    fetch(`/api/getRejectedRequests/` +
    `${userProfile.profileid}/${data.eventid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setRejectedRequests(json);
        })
        .catch((err) => {
          console.log(err);
        });
  };


  useEffect(() => {
    getPendingRequestsSent();
    getPendingRequestsReceived();
    getApprovedRequests();
    getRejectedRequests();
  }, []);

  return (
    <>
      <Paper
        className='opportunity-requests'
        elevation={3}
        sx={{
          display: 'flex',
          marginBottom: '3rem',
          paddingBottom: '1rem',
          marginTop: '3rem',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '60vw',
          marginX: 'auto',
          height: 'auto',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='request-header'>
            Pending Requests Received
        </div>
        {pendingRequestsReceived &&
        pendingRequestsReceived.map((request, index) => (
          <RequestCard request={request}
            pendingRequests={pendingRequestsReceived}
            getPendingRequests={getPendingRequestsReceived}
            setPendingRequests={setPendingRequestsReceived}
            getApprovedRequests={getApprovedRequests}
            getRejectedRequests={getRejectedRequests}
            data={data} key={index} />
        ))}

        {(!pendingRequestsReceived || pendingRequestsReceived.length == 0) &&
        <h5 className='no_results_message'>
          No Requests found
        </h5>}
      </Paper>
      <Paper
        className='opportunity-requests'
        elevation={3}
        sx={{
          display: 'flex',
          marginBottom: '3rem',
          paddingBottom: '1rem',
          marginTop: '3rem',
          flexDirection: 'column',
          justifyContent: 'center',
          marginX: 'auto',
          width: '60vw',
          height: 'auto',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='request-header'>
            Pending Requests Sent By You
        </div>
        {pendingRequestsSent &&
        pendingRequestsSent.map((request, index) => (
          <RequestCard request={request}
            pendingRequests={pendingRequestsSent}
            setPendingRequests={setPendingRequestsSent}
            getPendingRequests={getPendingRequestsSent}
            data={data} key={index} />
        ))}

        {(!pendingRequestsSent || pendingRequestsSent.length == 0) &&
        <h5 className='no_results_message'>
          No Requests found
        </h5>}
      </Paper>
      <Paper
        className='opportunity-requests'
        elevation={3}
        sx={{
          display: 'flex',
          marginBottom: '3rem',
          paddingBottom: '1rem',
          marginTop: '3rem',
          flexDirection: 'column',
          justifyContent: 'center',
          marginX: 'auto',
          width: '60vw',
          height: 'auto',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='request-header'>
            Approved Requests
        </div>
        {approvedRequests &&
        approvedRequests.map((request, index) => (
          <RequestCard request={request}
            data={data} key={index} />
        ))}

        {(!approvedRequests || approvedRequests.length == 0) &&
        <h5 className='no_results_message'>
          No Approved Requests found
        </h5>}
      </Paper>
      <Paper
        className='opportunity-requests'
        elevation={3}
        sx={{
          display: 'flex',
          marginBottom: '3rem',
          paddingBottom: '1rem',
          marginTop: '3rem',
          flexDirection: 'column',
          justifyContent: 'center',
          marginX: 'auto',
          width: '60vw',
          height: 'auto',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='request-header'>
            Rejected Requests
        </div>
        {rejectedRequests &&
        rejectedRequests.map((request, index) => (
          <RequestCard request={request}
            data={data} key={index} />
        ))}

        {(!rejectedRequests || rejectedRequests.length == 0) &&
        <h5 className='no_results_message'>
          No Rejected Requests found
        </h5>}
      </Paper>
    </>
  );
}

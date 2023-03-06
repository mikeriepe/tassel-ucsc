import React, {useEffect, useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiBox from '@mui/material/Box';
import useAuth from '../util/AuthContext';
import {useNavigate} from 'react-router-dom';

/**
 * @return {JSX}
 */
export default function DashboardPendingOppCard({
  opportunity,
}) {
  const {userProfile} = useAuth();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const navigateToOpp = (oppid) => {
    navigate(`/Opportunity/${oppid}`);
  };

  const getPendingRequestsReceived = () => {
    fetch(`/api/getPendingRequestsReceived/` +
    `${userProfile.profileid}/${opportunity.eventid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          if (json.length > 0) {
            json.map((request) => request.status = 'Pending'),
            setRequests((prevRequests) => ([
              ...prevRequests,
              ...json,
            ]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getPendingRequestsReceived();
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

    return `${convertDate} at ${convertTime}`;
  };

  const Banner = ({image}, props) => {
    return (
      <MuiBox sx={{height: '60px',
        width: '60px',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '1em',
      }} {...props}>
        <img
          src={image}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            border: '0.5px solid rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
          }}
        />
      </MuiBox>
    );
  };

  const EventTitleText = ({children}, props) => (
    <MuiBox
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        lineHeight: 1.5,
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: 'var(--secondary-yellow-main)',
      }}
      {...props}
    >
      {children}
    </MuiBox>
  );

  const RequestsText = ({children}, props) => {
    return (
      <MuiBox sx={{height: '45px',
        width: '45px',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ED4949',
        borderRadius: '1em',
        color: '#FFFFFF',
        letterSpacing: '-0.015em',
        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '18px',
        margin: 'auto',
        alignItems: 'center',
        display: 'flex',
      }} {...props}>
        {children}
      </MuiBox>
    );
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        style={{height: 100, cursor: 'pointer'}}
        onClick={()=> navigateToOpp(opportunity.eventid)}
      >
        <TableCell
          component='th'
          scope='row'
          padding='none'
          align='left'
        >
          <div
            className='flex-horizontal flex-align-center flex-flow-large'
          >
            <Banner image={opportunity.eventbanner} />
            <div
              className='flex-vertical flex-align-left flex-flow-large'
            >
              <EventTitleText>{`${opportunity?.eventname}`}</EventTitleText>
              <p>{formatDate(opportunity.starttime)}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <RequestsText>
            {requests.length}
          </RequestsText>
        </TableCell>
      </TableRow>
    </>
  );
}

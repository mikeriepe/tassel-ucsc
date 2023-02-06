import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import {toast} from 'react-toastify';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import useAuth from '../util/AuthContext';
import RequestModal from './RequestOpportunityModal';

const IconStyling = {
  fontSize: '0.9rem',
};

const Card = styled((props) => (
  <MuiCard elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Avatar = ({image}, props) => (
  <MuiAvatar
    {...props}
    src={image}
    sx={{
      height: '25px',
      width: '25px',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
    }}
  />
);

const Banner = ({image}, props) => {
  return (
    <MuiBox sx={{height: '130px', width: '130px'}} {...props}>
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

const OutlinedIconButton = ({
  children,
  type,
  opportunityid,
  profileid,
  getPendingOpportunities}, props) => (
  <ButtonBase
    component='div'
    onMouseDown={(e) => {
      e.stopPropagation();
    }}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      if (type === 'pending') {
        // fetch the request
        fetch(`/api/getPendingRequestsSent/${profileid}/${opportunityid}`)
            .then((res) => {
              if (!res.ok) {
                throw res;
              }
              return res.json();
            })
            .then((json) => {
              fetch(`/api/deleteRequest/`, {
                method: 'DELETE',
                body: JSON.stringify({requestId: json[0].requestid}),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            })
            .then(() => {
              getPendingOpportunities();
            })
            .catch((err) => {
              console.log(err);
              alert('Error deleting request');
            });
      }
    }}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      padding: 0,
      background: 'transparent',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      borderRadius: '5px',
    }}
    {...props}
  >
    {children}
  </ButtonBase>
);

const OutlinedButton = (props) => {
  const {handleModalOpen, ...rest} = props;
  return (
    <ButtonBase
      component='div'
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        handleModalOpen();
        e.stopPropagation();
        e.preventDefault();
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        width: '80px',
        padding: 0,
        background: 'var(--secondary-yellow-main)',
        border: '0.5px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '5px',
      }}
      {...rest}
    >
      {props.children}
    </ButtonBase>
  );
};

/**
 * @return {JSX}
 */
export default function OpportunitiesCard({
  type,
  opportunity,
  getPendingOpportunities,
}) {
  const [creator, setCreator] = useState('');

  const [showReqForm, setshowReqForm] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const {userProfile} = useAuth();

  const handleModalClose = () => {
    setshowReqForm(false);
  };

  const handleModalOpen = () => {
    setshowReqForm(true);
  };

  const handleRequestMessage = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleRequestClick = (e) => {
    // Send request here
    // For consistency in the db, instead of null
    // role will be empty string
    const requestData = {
      requestee: creator.profileid,
      requester: userProfile.profileid,
      requestmessage: requestMessage,
      opportunityid: opportunity.eventid,
      role: '',
      toevent: true,
    };
    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
  };

  const postRequestToOpportunity = (requestData) => {
    fetch(`/api/postRequest`, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.status === 201) {
            toast.success(`Applied to ${opportunity.eventname}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            getPendingOpportunities();
          } else if (res.status === 409) {
            toast.warning(`You Already Applied to This Event`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(`Something Went Wrong. Please Try Again.`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Something Went Wrong. Please Try Again.');
        });
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

    return `${convertDate} at ${convertTime}`;
  };

  const calculateDuration = (date1, date2) => {
    const convertDate1 = new Date(date1);
    const convertDate2 = new Date(date2);

    const compare = Math.abs(convertDate1 - convertDate2);

    const compareInMinutes = Math.floor(compare / (1000 * 60));
    const compareInHours = Math.floor(compare / (1000 * 60 * 60));
    const compareInDays = Math.floor(compare / (1000 * 60 * 60 * 24));

    const minutes = compareInMinutes && (!compareInHours && !compareInDays);
    const hours = compareInHours && (compareInMinutes && !compareInDays);
    const days = compareInDays && (compareInMinutes && compareInHours);

    if (minutes) return `${compareInMinutes} Minutes`;
    if (hours) return `${compareInHours} Hours`;
    if (days) return `${compareInDays} Days`;
    return 'Error calculating dates';
  };

  const getOpportunityCreator = () => {
    fetch(`/api/getProfileName/${opportunity.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setCreator(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
  };

  useEffect(() => {
    getOpportunityCreator(opportunity);
  }, []);

  return (
    <>
      {opportunity && creator && (
        <Card className='clickable'>
          <CardActionArea
            component={RouterLink}
            to={`/Opportunity/${opportunity.eventid}`}
          >
            <div
              className='flex-space-between flex-align-center'
              style={{padding: '1.5em'}}
            >
              <MuiBox>
                <h4 className='text-dark ellipsis'>
                  {opportunity.eventname}
                </h4>
                <div className='flex-flow-large flex-align-center'>
                  <Avatar image={creator.profilepicture} />
                  <p className='text-bold text-disabled'>
                    Hosted by:&nbsp;
                    <span className='text-blue'>
                      {`${creator.firstname} ${creator.lastname}`}
                    </span>
                  </p>
                </div>
              </MuiBox>
              <div className='flex-flow-large' style={{marginLeft: '50px'}}>
                {(
                  type === 'upcoming' ||
                  type === 'created' ||
                  type === 'pending'
                ) && (
                  <OutlinedIconButton
                    type={type}
                    opportunityid={opportunity.eventid}
                    profileid={userProfile.profileid}
                    getPendingOpportunities={getPendingOpportunities}
                  >
                    <CloseRoundedIcon
                      sx={{
                        height: '20px',
                        width: '20px',
                        color: 'var(--error-red-main)',
                        stroke: 'var(--error-red-main)',
                        strokeWidth: '2px',
                      }}
                    />
                  </OutlinedIconButton>
                )}
                {type === 'created' && (
                  <OutlinedIconButton>
                    <EditRoundedIcon
                      sx={{
                        height: '20px',
                        width: '20px',
                        color: 'var(--tertiary-gray-main)',
                      }}
                    />
                  </OutlinedIconButton>
                )}
                {type === 'all' && (
                  <OutlinedButton handleModalOpen={handleModalOpen}>
                    <p className='text-xbold text-white'>Apply</p>
                  </OutlinedButton>
                )}
              </div>
            </div>
            <Divider sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)'}} />
            <div
              className='flex-horizontal flex-align-center'
              style={{padding: '1.5em'}}
            >
              <Banner image={opportunity.eventbanner} />
              <div className='flex-vertical'>
                <div
                  className='flex-horizontal flex-flow-large flex-align-center'
                  style={{paddingInline: '2em'}}
                >
                  <EventNoteRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {formatDate(opportunity.startdate)}
                  </p>
                  <ArrowForwardRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {formatDate(opportunity.enddate)}
                  </p>
                </div>
                <div
                  className='flex-horizontal flex-flow-large flex-align-center'
                  style={{paddingInline: '2em', marginTop: '0.25em'}}
                >
                  <TimerOutlinedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {
                      calculateDuration(
                          opportunity.startdate, opportunity.enddate,
                      )
                    }
                  </p>
                </div>
                <div
                  className='flex-horizontal flex-flow-large flex-align-center'
                  style={{paddingInline: '2em', marginTop: '0.25em'}}
                >
                  <AccessibilityRoundedIcon sx={IconStyling} />
                  <p className='text-bold ellipsis'>
                    {
                      opportunity.locationtype
                          .charAt(0).toUpperCase() +
                          opportunity.locationtype.slice(1)
                    }
                  </p>
                </div>
                {
                  opportunity.locationtype && (
                    opportunity.locationtype === 'in-person' ||
                    opportunity.locationtype === 'hybrid'
                  ) &&
                  <div
                    className='
                      flex-horizontal
                      flex-flow-large
                      flex-align-center
                    '
                    style={{paddingInline: '2em', marginTop: '0.25em'}}
                  >
                    <FmdGoodOutlinedIcon sx={IconStyling} />
                    <p className='text-bold'>
                      {`
                        ${opportunity.eventlocation.address}
                        ${opportunity.eventlocation.city},
                        ${opportunity.eventlocation.state}
                        ${opportunity.eventlocation.zip}
                      `}
                    </p>
                  </div>
                }
                {
                  opportunity.locationtype && (
                    opportunity.locationtype === 'remote' ||
                    opportunity.locationtype === 'hybrid'
                  ) &&
                  <div
                    className='
                      flex-horizontal
                      flex-flow-large
                      flex-align-center
                    '
                    style={{paddingInline: '2em', marginTop: '0.25em'}}
                  >
                    <DevicesOutlinedIcon sx={IconStyling} />
                    <p className='text-bold'>
                      {opportunity.eventzoomlink}
                    </p>
                  </div>
                }
              </div>
            </div>
          </CardActionArea>
          <RequestModal
            showReqForm={showReqForm}
            handleModalClose={handleModalClose}
            requestMessage={requestMessage}
            handleRequestMessage={handleRequestMessage}
            handleRequestClick={handleRequestClick}
            opportunityName={opportunity.eventname}
          />
        </Card>
      )}
    </>
  );
}

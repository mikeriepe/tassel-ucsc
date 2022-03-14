import * as React from 'react';
import {useState, useEffect} from 'react';
import {ListItem, IconButton, Menu, MenuItem} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../stylesheets/Opportunities.css';
import useAuth from '../util/AuthContext';
import ThemedButton from './ThemedButton';

const IconStyles = {
  fontSize: '1.3rem',
  color: '#757575',
};

/**
 * OpportunityCard
 * Opportunity ListItem Component
 * display events with pertinent information clearly visible
 * @param {*} data
 * @return {HTML} OpportunityCard component
 */
export default function OpportunityCard({data}) {
  const [opportunityCreator, setOpportunityCreator] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const [creatorName, setCreatorName] = useState('');

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'opportunity-menu';

  const {userProfile} = useAuth();

  const handleClick = () => {
    // console.log('');
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, action) => {
    setCurrentItem(action);
    setIsModalOpen(true);
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
    setRequestMessage('');
  };

  const handleRequestMessage = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleRequestClick = (e) => {
    // Send request here
    // Access opportunity data with:
    // data
    // opportunityCreator
    // requestMessage

    console.log(data);
    console.log(opportunityCreator);
    console.log(requestMessage);

    setCurrentItem(null);
    setIsModalOpen(false);
    setRequestMessage('');
  };

  const getOpportunityCreator = () => {
    fetch(`/api/getProfileName/${data.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const creator =
            `${json.firstname} ${json.lastname[0]}`;
          setOpportunityCreator(json);
          setCreatorName(creator);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
  };

  const formatDate = (date) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(date).toLocaleTimeString([], timeOptions);

    return {date: convertDate, time: convertTime};
  };

  useEffect(() => {
    getOpportunityCreator();
  }, []);

  return (
    <ListItem
      onClick={handleClick()}
      sx={{
        display: 'flex',
        cursor: 'pointer',
      }}
      disablePadding
    >
      {
        !data || !opportunityCreator &&
        <Skeleton variant="rectangular" width={785} height={210} />
      }
      {
        data && opportunityCreator &&
        <Card
          sx={{
            display: 'flex',
            height: '210px',
            width: '100%',
            boxShadow: '0',
            borderRadius: '10px',
            outline: '0.5px solid #d1d1d1',
          }}
        >
          <div className='opportunity-card-left'>
            <img
              className='opportunity-card-left-cover'
              src={data.eventbanner}
            />
          </div>
          <CardContent
            sx={{
              padding: '0',
              height: '100%',
              width: '60%',
            }}
          >
            <div className='opportunity-card-right'>
              <div className='opportunity-card-right-title'>
                {data.eventname}
              </div>
              <div className='opportunity-card-right-host'>
                {opportunityCreator !== null &&
                  <>
                    <div className='opportunity-card-right-host-avatar'>
                      <Avatar
                        src={opportunityCreator.profilepicture}
                        sx={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>
                    <div className='opportunity-card-right-host-name'>
                      {
                        // check if you created opp
                        opportunityCreator.profileid == userProfile.profileid ?
                        `Hosted by You` :
                        // check if user sponsored opp
                        data.organization ?
                        `Hosted by ${data.organization}` :
                        `Hosted by ${creatorName}`
                      }
                    </div>
                  </>
                }
              </div>
              <div className='opportunity-card-right-group'>
                <div className='opportunity-card-right-location'>
                  <div className='opportunity-card-right-location-icon'>
                    <LocationOnIcon sx={IconStyles} />
                  </div>
                  <div className='opportunity-card-right-location-text'>
                    {
                      data.locationtype ?
                      data.eventzoomlink : data.eventlocation
                    }
                  </div>
                </div>
                <div className='opportunity-card-right-date'>
                  <div className='opportunity-card-right-date-icon'>
                    <CalendarTodayIcon sx={IconStyles} />
                  </div>
                  <div className='opportunity-card-right-date-text'>
                    {data.startdate && formatDate(data.startdate).date}
                    {data.enddate && ` - ${formatDate(data.enddate).date}`}
                  </div>
                </div>
                <div className='opportunity-card-right-time'>
                  <div className='opportunity-card-right-time-icon'>
                    <ScheduleIcon sx={IconStyles} />
                  </div>
                  <div className='opportunity-card-right-time-text'>
                    {data.starttime && formatDate(data.starttime).time}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <div>
            <IconButton
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{
                margin: '0.5em',
              }}
            >
              <MoreHorizIcon>
              </MoreHorizIcon>
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <div>
              {
                opportunityCreator.profileid !== userProfile.profileid &&
                <MenuItem onClick={(e) => handleMenuItemClick(e, 'Request')}>
                  Request to Join
                </MenuItem>
              }
              {
                opportunityCreator.profileid === userProfile.profileid &&
                <div>
                  <MenuItem>Edit Opportunity</MenuItem>
                  <Divider />
                  <MenuItem>Cancel Opportunity</MenuItem>
                </div>
              }
            </div>
          </Menu>
          {currentItem && currentItem === 'Request' ? (
            <RequestModal
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
              requestMessage={requestMessage}
              handleRequestMessage={handleRequestMessage}
              handleRequestClick={handleRequestClick}
            />
          ) : null}
        </Card>
      }
    </ListItem>
  );
}

/**
 * Modal for request request
 * @param {Object} props
 * @return {Object} JSX
 */
function RequestModal(props) {
  const {
    isModalOpen,
    handleModalClose,
    requestMessage,
    handleRequestMessage,
    handleRequestClick,
  } = props;

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
    >
      <Paper
        sx={{
          position: 'absolute',
          padding: '1.5em',
          top: '50%',
          left: '50%',
          height: 'auto',
          width: '600px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='request-title'>
          Request to Join
        </div>
        <div className='request-subtitle'>
          Your Request Message:
        </div>
        <div className='request-message'>
          <textarea
            value={requestMessage}
            onChange={handleRequestMessage}
            style={{
              resize: 'none',
              height: '200px',
              width: '595px',
              outline: 'none',
            }}
          />
        </div>
        <div className='request-buttons'>
          <div className='request-buttons-request'>
            <ThemedButton
              color={'yellow'}
              variant={'themed'}
              onClick={handleRequestClick}
            >
              Send Request to Join
            </ThemedButton>
          </div>
          <div className='request-buttons-cancel'>
            <ThemedButton
              color={'gray'}
              variant={'cancel'}
              onClick={handleModalClose}
            >
              Cancel
            </ThemedButton>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}

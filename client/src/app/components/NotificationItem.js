import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import useAuth from '../util/AuthContext';
// requester/requestee id -> user name
// opportunityid -> event name
/**
 * Notification Item
 * Displays the notification items
 * @return {HTML} notification items
 */
export default function NotificationItem({data}) {
  const {userProfile} = useAuth();
  const [requesterProfile, setProfile] = React.useState(null);
  const [opportunity, setOpportunity] = React.useState(null);

  const getProfile = () => {
    fetch(`/api/getProfileByProfileId/${data.requester}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setProfile(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving profile, please try again');
        });
  };

  const getOpportunity = () => {
    fetch(`/api/getOpportunity/${data.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setOpportunity(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving selected opportunity');
        });
  };

  const gotoNotificationDetail = (id) => {

  };

  React.useEffect(() => {
    if (data.requester != null) {
      getProfile();
    }
    getOpportunity();
  }, []);

  return (
    <div>
      {(data.requester != userProfile.profileid) &&
        <ListItemButton
          alignItems="flex-start"
          onClick={gotoNotificationDetail(data.requestid)}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="" />
          </ListItemAvatar>
          <ListItemText
            primary={
              `Request from 
              ${requesterProfile &&
                requesterProfile.firstname + ' ' + requesterProfile.lastname}`
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{display: 'inline'}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  for {opportunity && opportunity.eventname}
                </Typography>
                {` ${data.requestmessage}`}
              </React.Fragment>
            }
          />
        </ListItemButton>
      }
      {(data.requester == userProfile.profileid) &&
      data.requeststatus != 'pending' &&
      <ListItemButton
        alignItems="flex-start"
        onClick={gotoNotificationDetail(data.requestid)}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={
            `Your Request for ${opportunity && opportunity.eventname}
            is ${data.requeststatus}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.requestopportunity}
              </Typography>
              {` ${data.requestmessage}`}
            </React.Fragment>
          }
        />
      </ListItemButton>
      }
      <Divider variant="inset" component="li" />
    </div>
  );
}

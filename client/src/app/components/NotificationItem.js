import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
/**
 * Notification Item
 * Displays the notification items
 * @return {HTML} notification items
 */
export default function NotificationItem({data}) {
  const gotoNotificationDetail = (id) => {

  };
  return (
    <div>
      <ListItemButton
        alignItems="flex-start"
        onClick={gotoNotificationDetail(data.requestid)}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={`Request from ${data.requester}`}
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
      <Divider variant="inset" component="li" />
    </div>
  );
}

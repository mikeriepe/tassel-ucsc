import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
/**
 * Notification Item
 * Displays the notification items
 * @return {HTML} notification items
 */
export default function NotificationItem({data}) {
  return (
    <div>
      <ListItem alignItems="flex-start">
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
                {/* Jessica Wong */}
              </Typography>
              {`${data.requestmessage}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

import React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import NotificationItem from './NotificationItem';

const notifications =
[
  {
    'requestid': 1,
    'requester': 'Rachel Wong',
    'requeststatus': 'Pending',
    'requestdatetime': '3 days ago',
    'requestmessage':
      ' Hi I would like to volunteer for Gracehack event as a speaker',
    'requestopportunity': 'Gracehack-speaker',
  },
  {
    'requestid': 2,
    'requester': 'SWE team',
    'requeststatus': 'Pending',
    'requestdatetime': '4 days ago',
    'requestmessage': 'Hi you are a good fit for our speaker role of Gracehack',
    'requestopportunity': 'SWE speaker panel',
  },
];

/**
 * Notification
 * Displays the notification popover
 * @return {HTML} notification
 */
export default function Notification({props}) {
  const handleNotificationClose = () => {
    props.setNotificationAnchorEl(null);
  };
  return (
    <div>
      <Popover
        id={props.notificationId}
        open={props.showNotification}
        anchorEl={props.notificationAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List
          sx={{
            width: '100%', maxWidth: 400, bgcolor: 'background.paper',
          }}>
          {notifications && notifications.map((notification, index) => (
            <NotificationItem
              key={`notification-item-${index}`}
              data={notification}
            />
          ))}
        </List>
      </Popover>
    </div>
  );
}

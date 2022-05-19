import * as React from 'react';
import useAuth from '../util/AuthContext';
import {useTheme} from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ThemedButton from '../components/ThemedButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import {
  drawerWidth,
  DrawerHeader,
  Drawer,
  AppBar,
} from './NavBarComponents';
import Notification from './Notification';

/**
 * logged in navbar
 * displays drawer on side
 * displays notifications and avatar on top
 * @return {*} NavBar Component
 */
export default function NavBarLoggedIn() {
  const {userProfile, setUser, setLoggedIn, setUserProfile} = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const pages = [
    ['Dashboard', '/dashboard', <DashboardIcon key='Dashboard'/>],
    ['Opportunities', '/opportunities', <EventIcon key='Opportunities'/>],
    ['Settings', '/settings', <SettingsIcon key='Settings'/>],
  ];

  // Notifications -------------------------------------------------------------

  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const showNotification = Boolean(notificationAnchorEl);
  const [notificationCount, setNotificationCount] = React.useState(0);

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const notificationId = 'notification-popover';
  const renderNotification = (
    <Notification
      props={{
        notificationAnchorEl: notificationAnchorEl,
        notificationId: notificationId,
        showNotification: showNotification,
        setNotificationAnchorEl: setNotificationAnchorEl,
        setNotificationCount: setNotificationCount,
      }}
    />
  );

  // Profile -------------------------------------------------------------------

  const handleError = (e) => {
    e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  };

  const handleLogout = () => {
    fetch(`/api/expireUserSession`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(()=>{
      setUser(null);
      setLoggedIn(false);
      setUserProfile(null);
      navigate('/');
    });
  };

  // Drawer Functions
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // NavBar --------------------------------------------------------------------
  return (
    <div>
      {/* top navbar */}
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: 'white',
          borderBottom: '0.5px solid #D1D1D1',
          boxShadow: '0',
          ml: {sm: `${drawerWidth}px`},
        }}
      >
        <Toolbar>
          {/* header */}
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && {display: 'none'}),
            }}
          >
            <MenuIcon />
          </IconButton>
          {
            !open &&
            <Link to='/dashboard'>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="secondary"
                style={{
                  fontWeight: 600,
                  fontStyle: 'italic',
                  cursor: 'pointer',
                }}
              >
                Tassel
              </Typography>
            </Link>
          }
          <Box sx={{flexGrow: 1}} />
          {/* top right icons */}
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            <Tooltip title="Notifications">
              <IconButton
                aria-controls={notificationId}
                size="large"
                aria-haspopup="true"
                aria-label="show number of new notifications"
                onClick = {handleNotificationOpen}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            {showNotification && renderNotification}
            <Link className='link' to="/myprofile">
              <ThemedButton
                startIcon={
                  <Avatar src={userProfile.profilepicture}
                    alt="Remy Sharp"
                    onError={handleError}
                    style={{marginRight: 5}}
                  />
                }
                color={'white'}
                variant={'themed'}
                type={'submit'}
                style={{borderRadius: 30, padding: 10}}
              >
                {/* TODO: replace with userProfile's first name */}
                FirstName
              </ThemedButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        {/* header */}
        <DrawerHeader>
          <Link
            to='/dashboard'
            style={{
              position: 'absolute',
              left: 0,
              paddingLeft: '24px',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="secondary"
              style={{
                fontWeight: 600,
                fontStyle: 'italic',
                cursor: 'pointer',
              }}
            >
              Tassel
            </Typography>
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {
               theme.direction === 'rtl' ?
               <ChevronRightIcon /> : <ChevronLeftIcon />
            }
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* main pages */}
        <List>
          {pages.map((arr, index) => {
            const [label, route, icon] = arr;
            return (
              <Link key={label} to={route}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{opacity: open ? 1 : 0}}
                    style={{fontWeight: 600}}
                  />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
        {/* logout */}
        <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Divider/>
          <List>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{opacity: open ? 1 : 0}}
                style={{fontWeight: 600}}
              />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

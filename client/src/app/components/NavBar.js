import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import {Link} from 'react-router-dom';
import useAuth from '../util/AuthContext';
import Notification from './Notification';
import logo from '../assets/ucsc.svg';
import '../stylesheets/NavBar.css';

/**
 * creates navbar
 * @return {HTML} navbar component
 */
export default function NavBar() {
  const {setUser,
    loggedIn,
    setLoggedIn,
    userProfile,
    setUserProfile} = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const showNotification = Boolean(notificationAnchorEl);
  const [notificationCount, setNotificationCount] = React.useState(0);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileOpen = () => {
    // TODO
    handleMenuClose();
  };

  const handleLogOut = () => {
    // TODO
    fetch(`/api/expireUserSession`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(()=>{
      handleMenuClose();
      setUser(null);
      setLoggedIn(false);
      setUserProfile(null);
    });
  };

  const handleError = (e) => {
    e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
  console.log(showNotification);

  // MENU FOR PROFILE
  const menuId = 'profile-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
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
      {!loggedIn &&
        <div>
          <Link className='link' to="/login"
            state={{signUp: false}}
          >
            <MenuItem>Log In</MenuItem>
          </Link>
          <Link className='link' to="/login"
            state={{signUp: true}}
          >
            <MenuItem>Sign up</MenuItem>
          </Link>
        </div>
      }
      {loggedIn &&
        <div>
          <Link className='link' to="/myprofile">
            <MenuItem onClick={handleProfileOpen}>My Profile</MenuItem>
          </Link>
          <Link className='link' to="/">
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
          </Link>
        </div>
      }
    </Menu>
  );

  // MOBILE MENU
  const mobileMenuId = 'navbar-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {loggedIn && <div>
        <Link className='link' to="/browse">
          <MenuItem>
            <IconButton size="large" color="inherit">
              <PersonSearchIcon />
            </IconButton>
            <p>Browse</p>
          </MenuItem>
        </Link>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new messages"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <ChatBubbleIcon />
            </Badge>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>

        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </div>}
      {!loggedIn && <div>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </div>}
    </Menu>
  );

  // FULL NAVBAR
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="relative"
        sx={{
          background: 'white',
          borderBottom: '0.5px solid #D1D1D1',
          boxShadow: '0',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
        <Toolbar>
          <Link className='link' to="/">
            <img className='logo' src={logo} alt="ucsc_logo"></img>
          </Link>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            {/* browse button */}
            {loggedIn && <div>
              <Link className='link' to="/browse">
                <Tooltip className="link-displace" title="Browse">
                  <IconButton size="large" color="inherit">
                    <PersonSearchIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              {/* messages button */}
              <Tooltip title="Messages">
                <IconButton
                  size="large"
                  aria-label="show 17 new messages"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <ChatBubbleIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              {/* notification button */}
              <Tooltip title="Notifications">
                <IconButton
                  aria-controls={notificationId}
                  size="large"
                  aria-haspopup="true"
                  aria-label="show number of new notifications"
                  color="inherit"
                  onClick = {handleNotificationOpen}
                >
                  <Badge badgeContent={notificationCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              {showNotification && renderNotification}
            </div>}
            {/* account icon */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {userProfile && <Avatar src={userProfile.profilepicture}
                alt="Remy Sharp"
                onError={handleError}
              />}
              {!userProfile && <Avatar
                alt="Remy Sharp"
              />}
            </IconButton>
          </Box>
          <Box sx={{display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

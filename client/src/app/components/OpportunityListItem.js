import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Menu} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {IconButton, ListItem, MenuItem} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../stylesheets/OpportunityListItem.css';
import useAuth from '../util/AuthContext';

/**
 * OpportunityListItem
 * Opportunity ListItem Component
 * display events with pertinent information clearly visible
 * @param {*} data
 * @return {HTML} OpportunityListItem component
 */
export default function OpportunityListItem({data}) {
  const [opportunityCreator, setOpportunityCreator] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startdate, setStartdate] = useState(null);
  const [starttime, setStarttime] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const {userProfile} = useAuth();

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'opportunity-menu';

  const getOpportunityCreator = () => {
    fetch(`/api/getProfileName/${data.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setOpportunityCreator(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
  };

  useEffect(() => {
    getOpportunityCreator();
  }, []);

  const handleClick = () => {
    console.log('');
  };

  useEffect(() => {
    if (data && data.startdate) {
      const date = new Date(data.startdate);
      const year = (date).getFullYear();
      let month = (date).getMonth()+1;
      let dt = (date).getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      setStartdate(year+'-' + month + '-'+dt);
    }
  }, [data.startdate]);

  useEffect(() => {
    if (data && data.starttime) {
      const time = new Date(data.starttime);
      const localtime = time.toLocaleTimeString();
      setStarttime(localtime);
      // const hours = time.getUTCHours();
      // const mins = time.getUTCMinutes();

      // setStarttime(hours + ':' + mins);
    }
  }, [data.starttime]);

  return (
    <ListItem onClick={handleClick()} sx={{cursor: 'pointer'}}>
      {data && <Card sx={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5px',
        marginBottom: '5px',
        height: 'auto',
        width: '50vw',
        maxHeight: '260px'}}>
        <CardMedia
          component='img'
          sx={{
            height: '300px',
            width: '300px',
            minWidth: '100px',
            minHeight: '100px'}}
          image={data.eventbanner}/>
        <CardContent>
          <Typography
            variant='h5'
            component='div'
            display='flex'
            fontSize='16pt'
            color='#fdc700'
            width='auto'
            maxWidth='550px'
            textOverflow='wrap'>
            {data.eventname}
          </Typography>
          <div className='opportunity'>
            {opportunityCreator != null && <div className='opportunity__host'>
              <Avatar src={opportunityCreator.profilepicture}
                sx={{height: '30px',
                  width: '30px',
                  maxHeight: '40px',
                  maxWidth: '40px'}}/>
              {opportunityCreator.profileid != userProfile.profileid &&
              <h5 className='opportunity__host-name'>
                Opportunity Hosted by {opportunityCreator.firstname + ' '}
                .{opportunityCreator.lastname[0]}
              </h5>}
              {opportunityCreator.profileid == userProfile.profileid &&
              <h5 className='opportunity__host-name'>
                Opportunity Hosted by You
              </h5>}
            </div>}
            <div className='opportunity__location'>
              <LocationOnIcon sx={{color: 'gray'}}/>
              <h6 className='opportunity__location-or-link'>
                {data.remote ? 'Virtual on Zoom': data.eventlocation}
              </h6>
            </div>
            {data.startdate &&
            <div className='opportunity__date'>
              <CalendarTodayIcon sx={{marginRight: '5px', color: 'gray'}}/>
              {startdate}
            </div>}
            {data.starttime &&
            <div className='opportunity__time'>
              <ScheduleIcon sx={{marginRight: '5px', color: 'gray'}}/>
              {starttime}
            </div>}

          </div>
        </CardContent>
        <IconButton sx={{height: '50px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignContent: 'end'}}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMenuOpen}>
          <MoreHorizIcon>
          </MoreHorizIcon>
        </IconButton>
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
            <MenuItem>Edit Opportunity</MenuItem>
            <MenuItem>Cancel Opportunity</MenuItem>
          </div>
        </Menu>
      </Card>}
    </ListItem>
  );
}

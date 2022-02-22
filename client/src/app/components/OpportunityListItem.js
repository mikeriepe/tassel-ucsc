import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {ListItem} from '@mui/material';

/**
 * OpportunityListItem
 * Opportunity ListItem Component
 * display events with pertinent information clearly visible
 * @param {*} data
 * @return {HTML} OpportunityListItem component
 */
export default function OpportunityListItem({data}) {
  const [opportunityCreator, setOpportunityCreator] = useState(null);

  const getOpportunityCreator = () => {
    fetch(`/api/getProfileName/${data.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setOpportunityCreator(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
  };

  useEffect(() => {
    getOpportunityCreator();
    console.log(opportunityCreator);
  }, []);

  const handleClick = () => {
    console.log('');
  };

  return (
    <ListItem onClick={handleClick()} sx={{cursor: 'pointer'}}>
      {data && <Card sx={{
        display: 'flex',
        marginTop: '5px',
        marginBottom: '5px',
        height: '200px',
        width: '48vw'}}>
        <CardMedia
          component='img'
          sx={{
            height: '200px',
            width: '300px',
            maxWidth: '300px',
            marginBlockEnd: 'auto'}}
          image={data.eventbanner}/>
        <CardContent>
          <Typography
            variant='h5'
            component='div'
            color='gold'
            width='600px'
            textOverflow='wrap'>
            {data.eventname}
          </Typography>
          <div className='opportunity'>
            {opportunityCreator != null && <div className='opportunity__host'>
              <Avatar src={opportunityCreator.profilepicture}/>
              <h5 className='opportunity__hostname'>
                Hosted by {opportunityCreator.firstname + ' '}
                .{opportunityCreator.lastname[0]}
              </h5>
            </div>}
            <div className='opportunity__location'>
              <h6 className='opportunity__remote'>
                {data.remote ? 'Remote' : 'In-Person'}
              </h6>
              <LocationOnIcon />
              <h6 className='opportunity__locationname'>
                {data.remote ? data.eventzoomlink : data.eventlocation}
              </h6>
            </div>
            {data.startdate && data.startdate.startdate &&
            <div className='opportunity__date'>
              <CalendarTodayIcon/>
              <h6 className='opportunity__startdate'>
                {data.startdate.startdate}
              </h6>
            </div>}
            {data.startdate && data.startdate.starttime &&
            <div className='opportunity__time'>
              <ScheduleIcon/>
              <h6 className='opportunity__starttime'>
                {data.startdate.starttime}
              </h6>
            </div>}
            <div className='opportunity__enddate'>
              <h6 className='opportunity__timeheader'>Ends:</h6>
              {data.enddate && data.enddate.enddate &&
              <div className='opportunity__endingdate'>
                <CalendarTodayIcon/>
                <h6 className='opportunity__endday'>
                  {data.enddate.enddate}
                </h6>
              </div>}
              {data.enddate && data.enddate.endtime &&
                <div className='opportunity__end'>
                  <ScheduleIcon/>
                  <h6 className='opportunity__endtime'>
                    {data.enddate.endtime}
                  </h6>
                </div>}
            </div>

          </div>
        </CardContent>
      </Card>}
    </ListItem>
  );
}

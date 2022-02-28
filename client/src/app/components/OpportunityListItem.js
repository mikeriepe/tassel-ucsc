import * as React from 'react';
import {useState, useEffect} from 'react';
import {ListItem} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../stylesheets/Opportunities.css';

const IconStyles = {
  fontSize: '1.3rem',
  color: '#757575',
};

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

  return (
    <ListItem
      onClick={handleClick()}
      sx={{
        display: 'flex',
        cursor: 'pointer',
      }}
      disablePadding
    >
      {data &&
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
                        `Hosted by 
                        ${opportunityCreator.firstname} 
                        ${opportunityCreator.lastname[0]}.`
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
                    {data.remote ? data.eventzoomlink : data.eventlocation}
                  </div>
                </div>
                <div className='opportunity-card-right-date'>
                  <div className='opportunity-card-right-date-icon'>
                    <CalendarTodayIcon sx={IconStyles} />
                  </div>
                  <div className='opportunity-card-right-date-text'>
                    {/* {data.startdate && data.startdate.startdate &&
                      `${data.startdate.startdate}`
                    }
                    {data.enddate && data.enddate.enddate &&
                      ` - ${data.startdate.startdate}`
                    } */}
                    {data.startdate && formatDate(data.startdate).date}
                    {data.enddate && ` - ${formatDate(data.startdate).date}`}
                  </div>
                </div>
                <div className='opportunity-card-right-time'>
                  <div className='opportunity-card-right-time-icon'>
                    <ScheduleIcon sx={IconStyles} />
                  </div>
                  <div className='opportunity-card-right-time-text'>
                    {/* {data.startdate && data.startdate.starttime &&
                      `${data.startdate.starttime}`
                    } */}
                    {data.startdate && formatDate(data.startdate).time}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    </ListItem>
  );
}

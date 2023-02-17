import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';

const Card = styled((props) => (
  <MuiCard elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  background: 'white',
}));

const Banner = ({image}, props) => {
  return (
    <MuiBox sx={{height: '130px',
      width: '130px',
      flexDirection: 'row',
      justifyContent: 'center',
    }} {...props}>
      <img
        src={image}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          border: '0.5px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        }}
      />
    </MuiBox>
  );
};

const EventTitleText = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      lineHeight: 1.5,
      fontWeight: 'bold',
      fontSize: '.9rem',
      paddingLeft: '1.5em',
      paddingTop: '.5em',
      color: 'var(--secondary-yellow-main)',
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const TimeText = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      lineHeight: 1,
      fontWeight: 'bold',
      fontSize: '1rem',
      paddingLeft: '1.5em',
      paddingTop: '.5em',
      paddingBottom: '2em',
      paddingRight: '3em',
      color: 'var(--tertiary-gray-dark)',
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * @return {JSX}
 */
export default function DashboardOppThumbnail({
  opportunity,
}) {
  const formatDate = (date, time) => {
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const convertDate = new Date(date).toLocaleDateString([], dateOptions);
    const convertTime = new Date(time).toLocaleTimeString([], timeOptions);

    return `${convertDate} at ${convertTime}`;
  };

  return (
    <>
      {opportunity && (
        <Card className='clickable'>
          <CardActionArea
            component={RouterLink}
            to={`/Opportunity/${opportunity.eventid}`}
          >
            <div
              className='flex-horizontal flex-align-center'
              style={{padding: '1.5em'}}
            >
              <Banner image={opportunity.eventbanner} />
            </div>
            <EventTitleText className='text-bold'>
              {`
                ${opportunity.eventname}
              `}
            </EventTitleText>
            <TimeText className='text-bold ellipsis'>
              {formatDate(opportunity.startdate, opportunity.starttime)}
            </TimeText>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}

import * as React from 'react';
import {styled} from '@mui/material';
import MuiPaper from '@mui/material/Paper';

const Volunteer = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5em',
  padding: '2em',
  height: 'auto',
  width: '60%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileVolunteer({data}) {
  return (
    <Volunteer>
      <h4 className='text-dark'>Volunteer Experience</h4>
      <div className='flow-medium'>
        {data ? Object.keys(data).map((job, index) => (
          <div key={`volunteer-experience-${index}`}>
            <h5>{data[job].title}</h5>
            <p className='text-bold text-blue'>{data[job].company}</p>
            <p>{data[job].location}</p>
            <p>{data[job].startDate + ' - ' + data[job].endDate}</p>
            <p style={{marginTop: '0.5em'}}>{data[job].description}</p>
          </div>
        )) : (
          <p>None</p>
        )}
      </div>
    </Volunteer>
  );
}

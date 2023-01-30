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
  // Volunteering experience data in database returns a string
  // Hasn't been changed yet to be an object like the work experience data
  // console.log(data.experience1);

  const exampleData1 = {
    title: 'Beach Cleanup',
    company: 'Marine Biology Club',
    location: 'Santa Cruz, CA',
    startDate: '2015',
    endDate: '2015',
    description: 'I picked up trash.',
  };
  const exampleData2 = {
    title: 'Speaker',
    company: 'Microsoft',
    location: 'Seattle, CA',
    startDate: '2017',
    endDate: '2018',
    description: 'I spoke about Microsoft.',
  };
  const exampleDataArray = [exampleData1, exampleData2];

  return (
    <Volunteer>
      <h4 className='text-dark'>Volunteer Experience</h4>
      <div className='flow-medium'>
        {data ? exampleDataArray.map((exampleData, index) => (
          <div key={`volunteer-experience-${index}`}>
            <h5>{exampleData.title}</h5>
            <p className='text-bold text-blue'>{exampleData.company}</p>
            <p>{exampleData.location}</p>
            <p>{exampleData.startDate + ' - ' + exampleData.endDate}</p>
            <p style={{marginTop: '0.5em'}}>{exampleData.description}</p>
          </div>
        )) : (
          <p>None</p>
        )}
      </div>
    </Volunteer>
  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/MyProfile.css';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileVolunteer({data}) {
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
    <Paper
      elevation={3}
      sx={{
        marginBottom: '3rem',
        width: '850px',
        height: 'auto',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='experience card-title'>
        Volunteer Experience
      </div>
      {exampleDataArray &&
        exampleDataArray.map((exampleData, index) => (
          <div
            className='experience-text'
            key={`volunteer-experience-${index}`}
          >
            <div className='experience-text-title'>
              {exampleData.title}
            </div>
            <div className='experience-text-company'>
              {exampleData.company}
            </div>
            <div className='experience-text-location'>
              {exampleData.location}
            </div>
            <div className='experience-text-date'>
              {exampleData.startDate + ' - ' + exampleData.endDate}
            </div>
            <div className='experience-text-description'>
              {exampleData.description}
            </div>
          </div>
        ))}
    </Paper>
  );
}

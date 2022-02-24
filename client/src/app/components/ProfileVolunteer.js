import * as React from 'react';
import Paper from '@mui/material/Paper';
import '../stylesheets/MyProfile.css';

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileVolunteer({data}) {
  console.log(data.experience1);
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
        width: '55vw',
        height: 'auto',
        boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <div className='experience card-title'>
        Volunteer Experience
      </div>
      {exampleData1 && exampleData2 &&
        exampleDataArray.map((exampleData, index) => (
          <>
            <div className='experience-text'>
              <div
                className='experience-text-title'
                key={`title-${index}`}
              >
                {exampleData.title}
              </div>
              <div
                className='experience-text-company'
                key={`company-${index}`}
              >
                {exampleData.company}
              </div>
              <div
                className='experience-text-location'
                key={`location-${index}`}
              >
                {exampleData.location}
              </div>
              <div
                className='experience-text-date'
                key={`date-${index}`}
              >
                {exampleData.startDate + ' - ' + exampleData.endDate}
              </div>
              <div
                className='experience-text-description'
                key={`description-${index}`}
              >
                {exampleData.description}
              </div>
            </div>
          </>
        ))}
    </Paper>
  );
}

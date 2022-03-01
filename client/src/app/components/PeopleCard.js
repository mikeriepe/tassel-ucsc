import * as React from 'react';
import {ListItem} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import BusinessCenterOutlined from '@mui/icons-material/BusinessCenterOutlined';
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined';
import StarOutlineOutlined from '@mui/icons-material/StarOutlineOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import VolunteerActivismOutlined
  from '@mui/icons-material/VolunteerActivismOutlined';
import '../stylesheets/Opportunities.css';

/**
 * @param {*} data
 * @return {HTML} People card component
 */
export default function PeopleCard({data}) {
  const exampleData = {
    name: 'Frederick Douglass',
    events: '6',
    recommendations: '4',
    availability: '3',
    work: [
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
    ],
    volunteer: [
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
      {
        organization: 'Amazon',
        position: 'Data Engineer',
        years: '2020-2021',
      },
    ],
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        cursor: 'pointer',
      }}
      disablePadding
    >
      <Card
        sx={{
          display: 'flex',
          height: '275px',
          width: '100%',
          boxShadow: '0',
          borderRadius: '10px',
          outline: '0.5px solid #d1d1d1',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            padding: '0',
            height: '100%',
            width: '100%',
          }}
        >
          <div className='people-card-left'>
            <div className='people-card-left-avatar'>
              <Avatar
                src={'p'}
                alt='Remy Sharp'
                sx={{
                  marginBottom: '1em',
                  height: '125px',
                  width: '125px',
                }}
              />
            </div>
            <div className='people-card-left-events'>
              <EventNoteOutlined className='people-card-left-icons' />
              <div className='people-card-left-text'>
                {`${exampleData.events} Events`}
              </div>
            </div>
            <div className='people-card-left-recommendations'>
              <StarOutlineOutlined className='people-card-left-icons' />
              <div className='people-card-left-text'>
                {`${exampleData.recommendations} Recommendations`}
              </div>
            </div>
            <div className='people-card-left-time'>
              <AccessTimeOutlined className='people-card-left-icons' />
              <div className='people-card-left-text'>
                {`Within ${exampleData.availability} Hours`}
              </div>
            </div>
          </div>
          <div className='people-card-right'>
            <div className='people-card-right-name'>
              {exampleData.name}
            </div>
            <div className='people-card-right-group'>
              <div className='people-card-right-work'>
                <div className='people-card-right-work-icon'>
                  <BusinessCenterOutlined />
                </div>
                <div className='people-card-right-text'>
                  {exampleData.work.map((experience, index) => (
                    <div
                      className='people-card-right-text-inner'
                      key={`volunteer-${index}`}
                    >
                      <div className='people-card-right-text organization'>
                        {experience.organization}
                      </div>
                      <div className='people-card-right-text position'>
                        {experience.position}
                      </div>
                      <div className='people-card-right-text years'>
                        {experience.years}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='people-card-right-volunteer'>
                <div className='people-card-right-icon'>
                  <VolunteerActivismOutlined />
                </div>
                <div className='people-card-right-text'>
                  {exampleData.volunteer.map((experience, index) => (
                    <div
                      className='people-card-right-text-inner'
                      key={`work-${index}`}
                    >
                      <div className='people-card-right-text organization'>
                        {experience.organization}
                      </div>
                      <div className='people-card-right-text position'>
                        {experience.position}
                      </div>
                      <div className='people-card-right-text years'>
                        {experience.years}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ListItem>
  );
}

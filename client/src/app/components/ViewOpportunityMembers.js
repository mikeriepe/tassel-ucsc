import React from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import MuiPaper from '@mui/material/Paper';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import OpportunityBanner from '../assets/examplecover.png';

const Paper = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Member = styled((props) => (
  <MuiBox className='member' {...props} />
))(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '0.5em 2em 0.5em 2em',
  userSelect: 'none',
}));

const Avatar = ({image}, props) => (
  <MuiAvatar sx={{height: '30px', width: '30px'}} src={image} {...props} />
);

/**
 * Members section for view opportunity
 * @return {JSX}
 */
export default function ViewOpportunityMembers() {
  const exampleMemberData = [
    {
      name: 'John Higgins',
      role: 'Owner',
      avatar: OpportunityBanner,
    },
    {
      name: 'Bob Duncan',
      role: 'Hackathon Panelist',
      avatar: OpportunityBanner,
    },
    {
      name: 'Jessica James',
      role: 'Hackathon Judge',
      avatar: OpportunityBanner,
    },
    {
      name: 'Janice Rodriguez',
      role: 'Hackathon Judge',
      avatar: OpportunityBanner,
    },
    {
      name: 'Samuel Andrews',
      role: 'Unassigned',
      avatar: OpportunityBanner,
    },
    {
      name: 'Nathan Smith',
      role: 'Unassigned',
      avatar: OpportunityBanner,
    },
  ];

  return (
    <Paper>
      <h4
        className='text-dark'
        style={{padding: '1.5em 2em calc(1.5em - 0.5em) 2em'}}
      >
        Members
      </h4>
      <div style={{paddingBottom: 'calc(1.5em - 0.5em)'}}>
        {exampleMemberData.map((member, index) => (
          <Member
            className='hover-highlight clickable'
            key={`member-${index}`}
          >
            <Avatar image={member.avatar} />
            <div>
              <div className='flex-align-center'>
                <p className='text-bold text-blue'>
                  {member.name}
                </p>
                {member.role === 'Owner' && (
                  <StarRoundedIcon
                    sx={{
                      margin: '0 0 2px 5px',
                      fontSize: '1rem',
                      color: 'var(--secondary-yellow-main)',
                    }}
                  />
                )}
              </div>
              <p>{member.role}</p>
            </div>
          </Member>
        ))}
      </div>
    </Paper>
  );
};

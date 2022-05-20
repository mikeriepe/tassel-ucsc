import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiPaper from '@mui/material/Paper';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ThemedButton from './ThemedButton';

/**
 * About tab for view opportunity
 * @return {JSX}
 */
export default function ViewOpportunityAbout({description, roles}) {
  return (
    <>
      <DescriptionCard description={description} />
      <RolesCard roles={roles} />
    </>
  );
};

const Description = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1em',
  padding: '1.5em 2em 1.5em 2em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

/**
 * Opportunity details card
 * @return {JSX}
 */
function DescriptionCard({description}) {
  return (
    <Description>
      <h4 className='text-dark' style={{paddingBottom: '1.5em'}}>
        Description
      </h4>
      <p>{description}</p>
    </Description>
  );
}

const Roles = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1em',
  height: 'auto',
  width: '100%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  'paddingInline': '2em',
  'borderBlock': `0.5px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:last-child': {
    borderBottom: 0.,
    borderRadius: '0 0 10px 10px',
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />}
    {...props}
  />
))(() => ({
  'backgroundColor': 'white',
  'paddingInline': 0,
  'paddingBlock': '0.5em',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  paddingInline: theme.spacing(0),
}));

/**
 * Opportunity roles card
 * @return {JSX}
 */
function RolesCard({roles}) {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Roles>
      <h4 className='text-dark' style={{padding: '1.5em 2em 1.5em 2em'}}>
        Roles
      </h4>
      <Box>
        {
          roles.map((role, index) => (
            <Accordion
              key={`panel${index}`}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                id={`panel${index}d-header`}
                aria-controls={`panel${index}d-content`}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    justifyContent: 'space-between',
                    marginRight: '2em',
                  },
                }}
              >
                <Box className='flex-vertical flex-justify-center'>
                  <p className='text-bold text-blue'>
                    {`${role.name} (${role.slots})`}
                  </p>
                  <p className='text-xsmall text-gray'>
                    {role.tags.join(', ')}
                  </p>
                </Box>
                <ThemedButton
                  variant='themed'
                  color='yellow'
                  size='small'
                >
                  Request Role
                </ThemedButton>
              </AccordionSummary>
              <AccordionDetails
                className='flex-vertical flex-flow-large flow-small'
              >
                <div className='flex-vertical'>
                  <p className='text-bold'>Responsibilites</p>
                  <p className='text-xsmall text-gray'>
                    {role.responsibilities}
                  </p>
                </div>
                <div className='flex-vertical'>
                  <p className='text-bold'>
                    Preferred Qualifications
                  </p>
                  <ul style={{padding: 0, margin: 0}}>
                    {role.preferences.map((preference, index) => (
                      <p
                        className='text-xsmall text-gray'
                        key={`preference-${index}`}
                      >
                        {`· ${preference}`}
                      </p>
                    ))}
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </Box>
    </Roles>
  );
}

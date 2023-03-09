import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import OpportunityForm from '../components/OpportunityForm';
import {Modal} from '@mui/material';
import useAuth from '../util/AuthContext';
import {toast} from 'react-toastify';

const Display = styled((props) => (
  <MuiCard elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: 'auto',
  width: '100%',
  background: 'var(--primary-blue-main)',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
  marginTop: '1em',
}));

const HeadingText = ({children}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      lineHeight: 1.5,
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      margin: '1em',
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const formValues = {
  eventname: '',
  locationtype: 'in-person',
  eventlocation: {
    'address': '',
    'state': '',
    'city': '',
    'zip': '',
  },
  sponsortype: 'user sponsor',
  eventzoomlink: '',
  organization: '',
  description: '',
  eventdata: '',
  startdate: new Date(),
  enddate: new Date(),
  organizationtype: '',
  opportunitytype: '',
  starttime: new Date(),
  endtime: new Date(),
  subject: '',
};

/**
 * creates Dashboard header
 * @return {HTML} Dashboard header component
 */
export default function DashboardCreate() {
  const {userProfile} = useAuth();
  const [showOppForm, setShowOppForm] = useState(false);

  const handleModalClose = () => {
    setShowOppForm(!showOppForm);
  };

  const onSubmit = (data) => {
    const newOpportunity = {
      assignedroles: {},
      eventbanner: 'https://www.sorenkaplan.com/wp-content/uploads/2017/07/Testing.jpg',
      active: null,
      userparticipants: [],
      preferences: {},
      usersponsors: {'creator': userProfile.profileid},
      ...data,
    };

    fetch(`/api/postOpportunity`, {
      method: 'POST',
      body: JSON.stringify(newOpportunity),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((json) => {
          toast.success('Opportunity Created', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleModalClose();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <Display>
      <HeadingText>
         Create new Opportunities
      </HeadingText>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '26px',
        marginBottom: '1em',
      }}>
        <Button onClick={() => setShowOppForm(true)}
          sx={{
            'height': '100%',
            'lineHeight': 1.5,
            'color': 'white',
            'fontSize': '.7rem',
            'marginLeft': '2em',
            'bgcolor': '#249BCE',
            'padding': '.7rem',
            'borderRadius': '26px',
            ':hover': {bgcolor: '#34cceb', color: 'white'},
          }}
        >
          Create an Opportunity
        </Button>
        <AddIcon
          sx={{
            fontSize: '7em',
            color: 'white'}}/>
      </Box>
      <Modal
        open={showOppForm}
        onBackdropClick={() => setShowOppForm(false)}
        onClose={() => setShowOppForm(false)}
        sx={{overflow: 'scroll'}}
      >
        <OpportunityForm
          onClose={handleModalClose}
          defaultValues={formValues}
          onSubmit={onSubmit}
        />
      </Modal>
    </Display>
  );
}

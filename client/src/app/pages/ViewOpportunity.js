import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import CompressedTabBar from '../components/CompressedTabBar';
import PageHeader from '../components/PageHeader';
import ThemedButton from '../components/ThemedButton';
import ViewOpportunityAbout from '../components/ViewOpportunityAbout';
// import ViewOpportunityFindPeople
// from '../components/ViewOpportunityFindPeople';
import ViewOpportunityForums from '../components/ViewOpportunityForums';
import ViewOpportunityMembers from '../components/ViewOpportunityMembers';
import ViewOpportunityRequests from '../components/ViewOpportunityRequests';
import useAuth from '../util/AuthContext';
import RequestModal from '../components/RequestOpportunityModal';
import {toast} from 'react-toastify';

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  margin: '2em 2em',
  display: 'flex',
  height: 'auto',
  width: 'auto',
  background: 'var(--background-primary)',
}));

/**
 * Passes fetched data to view opportunity page
 * @return {JSX}
 */
export default function FetchWrapper() {
  const params = useParams();
  const [fetchedData, setFetchedData] = useState(null);

  const getOpportunity = () => {
    fetch(`/api/getOpportunity/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setFetchedData(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving selected opportunity');
        });
  };

  const getOpportunityRoles = () => {
    fetch(`/api/getRoles/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setFetchedData((prevData) => ({
            ...prevData,
            roles: json,
          }));
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity roles');
        });
  };

  useEffect(async () => {
    if (params.opportunityid) {
      await getOpportunity();
      await getOpportunityRoles();
    }
  }, []);

  return (
    <>
      {
        fetchedData &&
        fetchedData.usersponsors &&
        <ViewOpportunity opportunity={fetchedData} />
      }
    </>
  );
}

/**
 * View opportunity page
 * @return {JSX}
 */
function ViewOpportunity({opportunity}) {
  const params = useParams();
  const {userProfile} = useAuth();
  const [isCreator, setIsCreator] = useState(false);
  const [creator, setCreator] = useState(null);
  const [tab, setTab] = useState(0);

  const [showReqForm, setshowReqForm] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState('');
  const [requestedRole, setRequestedRole] = React.useState('');
  // REMOVE REQUESTED ROLE STATE

  // list of all the participants
  const [participants, setParticipants] =
  useState(opportunity?.userparticipants);

  // list of assigned roles in the opportunity
  const [members, setMembers] = useState(opportunity?.assignedroles);

  const updateMembers = (newMembers) => {
    setMembers(newMembers);
  };

  const updateParticipants = (newParticipants) => {
    setParticipants(newParticipants);
  };

  const handleModalClose = () => {
    setRequestedRole('');
    setshowReqForm(false);
  };

  const handleModalOpen = (role) => {
    setRequestedRole(role);
    setshowReqForm(true);
  };

  const handleRequestMessage = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleRequestClick = (e) => {
    // Send request here
    const requestData = {
      requestee: creator.profileid,
      requester: userProfile.profileid,
      requestmessage: requestMessage,
      opportunityid: opportunity.eventid,
      role: requestedRole,
      toevent: true,
    };
    postRequestToOpportunity(requestData);
    setshowReqForm(false);
    setRequestMessage('');
  };

  const postRequestToOpportunity = (requestData) => {
    fetch(`/api/postRequest`, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.status === 201) {
            toast.success(`Applied to ${opportunity.eventname}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (res.status === 409) {
            toast.warning(`You Already Applied to This Event`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(`Something Went Wrong. Please Try Again.`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Something Went Wrong. Please Try Again.');
        });
  };

  const noncreatorTabs = [
    {
      name: 'About',
      component:
        <ViewOpportunityAbout
          isCreator={isCreator && isCreator}
          description={opportunity?.description}
          roles={opportunity?.roles}
          opportunityName={opportunity?.eventname}
          opportunityid={opportunity?.eventid}
          creator={creator}
        />,
    },
    {
      name: 'Forums',
      component:
        <ViewOpportunityForums
          id={opportunity.eventid}
        />,
    },
  ];

  const creatorTabs = [
    {
      name: 'About',
      component:
        <ViewOpportunityAbout
          isCreator={isCreator && isCreator}
          description={opportunity?.description}
          roles={opportunity?.roles}
          tags={opportunity?.keywords}
        />,
    },
    {
      name: 'Forums',
      component:
        <ViewOpportunityForums
          id={params.opportunityid}
        />,
    },
    {
      name: 'Requests',
      component: <ViewOpportunityRequests
        updateParticipants={updateParticipants}
        participants={participants}
        updateMembers={updateMembers}
        members={members}
      />,
    },
    // Find people tab will be implemented in Spring 2023
    // For now it will stay hidden
    /*
    {
      name: 'Find People',
      component: <ViewOpportunityFindPeople />,
    },
    */
  ];

  const handleIsCreator = () => {
    const check = userProfile.profileid === opportunity.usersponsors.creator;
    setIsCreator(check);
  };

  const getOpportunityCreator = () => {
    fetch(`/api/getProfileName/${opportunity.usersponsors.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setCreator(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity creators profile');
        });
  };

  useEffect(() => {
    if (opportunity) {
      getOpportunityCreator();
      handleIsCreator();
    }
  }, []);

  return (
    <Page>
      {
        opportunity && creator &&
        <>
          <MuiBox sx={{width: '70%', marginRight: '2em'}}>
            <PageHeader
              type='viewopportunity'
              isCreator={isCreator}
              title={opportunity?.eventname}
              subtitle='Hosted by:'
              host={`${creator?.firstname} ${creator?.lastname}`}
              avatar={creator?.profilepicture}
              banner={opportunity?.eventbanner}
              backUrl={'/opportunities'}
              data={opportunity}
              components={
                <ThemedButton
                  variant='gradient'
                  color='yellow'
                  size='small'
                  onClick={() => {
                    handleModalOpen('');
                  }}
                >
                  Request to Join
                </ThemedButton>
              }
              tabs={isCreator ?
                <CompressedTabBar
                  type='viewopportunity'
                  data={creatorTabs}
                  tab={tab}
                  setTab={setTab}
                /> :
                <CompressedTabBar
                  type='viewopportunity'
                  data={noncreatorTabs}
                  tab={tab}
                  setTab={setTab}
                />
              }
              tabNumber={tab}
            />
            {isCreator ?
              creatorTabs[tab].component :
              noncreatorTabs[tab].component
            }
          </MuiBox>
          <MuiBox sx={{width: '30%'}}>
            <ViewOpportunityMembers
              isCreator={isCreator}
              owner={{
                name: `${creator?.firstname} ${creator?.lastname}`,
                avatar: creator?.profilepicture,
                profileid: creator?.profileid,
              }}
              members={members}
              participants={participants}
            />
          </MuiBox>
          <RequestModal
            showReqForm={showReqForm}
            handleModalClose={handleModalClose}
            requestMessage={requestMessage}
            handleRequestMessage={handleRequestMessage}
            handleRequestClick={handleRequestClick}
            opportunityName={opportunity.eventname}
          />
        </>
      }
    </Page>
  );
}

import * as React from 'react';
import {useParams} from 'react-router-dom';
import {IconButton} from '@mui/material';
import {Link} from 'react-router-dom';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import OpportunityRequests from './_OLD_OpportunityRequests';
import OpportunityDetails from './OpportunityDetails';
import TabBar from './_OLD_TabBar';

/**
 * OpportunityPage component
 * @return {html} Opportunity page
 */
export default function OpportunityPage() {
  const params = useParams();
  console.log(params);
  const [opportunity, setOpportunity] = React.useState(null);


  const getOpportunity = () => {
    fetch(`/api/getOpportunity/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setOpportunity(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving selected opportunity');
        });
  };

  React.useEffect(() => {
    getOpportunity();
  }, []);

  const tabs = [
    {name: 'Opportunity', component: <OpportunityDetails data={opportunity}/>},
    {name: 'Requests', component: <OpportunityRequests data={opportunity}/>},
  ];

  return (
    <div>
      {opportunity && <TabBar data={tabs} state={0}/>}
      <IconButton sx={{display: 'flex', position: 'absolute', bottom: '600px',
        left: '100px'}}>
        <Link className='link' to="/myprofile"
          state={{tab: 1}}
        >
          <ArrowBackSharpIcon sx={{fontSize: 70}}/>
        </Link>
      </IconButton>
    </div>);
}

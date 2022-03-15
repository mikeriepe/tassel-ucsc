import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import OpportunityCard from './OpportunityCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../stylesheets/BrowseOpportunities.css';

/**
 * returns list of opportunities
 * @param {*} props stores filters
 * @return {HTML} list of opportunities
 */
export default function BrowseOpportunities(props) {
  const {locationFilter, oppTypeFilter, orgTypeFilter} = props;
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);
  const [displayOpps, setDisplayOpps] = useState([]);

  // component first renders
  useEffect(() => {
    getOpportunities();
    applyFilters();
  }, []);

  // update display opps
  useEffect(() => {
    if (displayOpps && displayOpps.length > 0) {
      setLoading(false);
    }
  }, [displayOpps]);

  // update displayed opportunities when filters are updated
  useEffect(() => {
    applyFilters(opportunities);
  }, [locationFilter, oppTypeFilter, orgTypeFilter]);

  const getOpportunities = () => {
    fetch(`/api/getOpportunities`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setOpportunities(json);
          setDisplayOpps(json);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunities');
        });
  };

  const applyFilters = () => {
    // set all filters to lowercase for comparison
    const locationFilterLower = locationFilter.map((filter) => {
      return filter.toLowerCase();
    });
    const oppTypeFilterLower = oppTypeFilter.map((filter) => {
      return filter.toLowerCase();
    });
    const orgTypeFilterLower = orgTypeFilter.map((filter) => {
      return filter.toLowerCase();
    });
    // filter opportunities and store in displayOpps
    const copyOpps = opportunities.filter((opp) => {
      const location = locationFilterLower.length == 0 ?
        true :
        opp.locationtype ?
        locationFilterLower.indexOf(opp.locationtype.toLowerCase()) > -1 :
        false;
      const oppType = oppTypeFilter.length == 0 ?
        true :
        opp.opportunitytype ?
        oppTypeFilterLower.indexOf(opp.opportunitytype.toLowerCase()) > -1 :
        false;
      const orgType = orgTypeFilter.length == 0 ?
        true :
        opp.organizationtype ?
        orgTypeFilterLower.indexOf(opp.organizationtype.toLowerCase()) > -1 :
        false;
      console.log(location && oppType && orgType);
      return location && oppType && orgType;
    });
    setDisplayOpps(copyOpps);
  };

  console.log(displayOpps);

  return (
    <div>
      {
        loading &&
        <Box
          display="flex"
          justifyContent="center"
          minHeight="100vh"
        >
          <CircularProgress className='spinner'/>
        </Box>
      }
      <List
        sx={{
          display: 'grid',
          gap: '2em',
          paddingBlock: '3em',
          width: '785px',
          margin: 'auto',
          borderRadius: '10px',
        }}
      >
        {
          !loading && displayOpps && displayOpps.length > 0 &&
          displayOpps.map((opp, index) => (
            <OpportunityCard
              key={`people-list-item-${index}`}
              data={opp}
            />
          ))
        }
        {
          !loading && displayOpps && displayOpps.length === 0 &&
          <h1>No Opportunities Found</h1>
        }
      </List>
    </div>
  );
}

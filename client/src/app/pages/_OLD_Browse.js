import * as React from 'react';
import {useState} from 'react';
import '../stylesheets/_OLD_Browse.css';
import Box from '@mui/material/Box';
import BrowseFilterDrawer from '../components/_OLD_BrowseFilterDrawer';
import TabBar from '../components/_OLD_TabBar';
import BrowseOpportunities from '../components/_OLD_BrowseOpportunities';
import BrowsePeople from '../components/_OLD_BrowsePeople';

// import useAuth from '../util/AuthContext';

/**
 * returns Browsing page
 * @return {HTML} Browse component
 */
export default function Browse() {
  // states for tab view
  const oppInd = 0;
  const [tab, setTab] = React.useState(oppInd);

  // states for opportunity filters
  const [locationFilter, setLocationFilter] = useState([]);
  const [oppTypeFilter, setOppTypeFilter] = useState([]);
  const [orgTypeFilter, setOrgTypeFilter] = useState([]);

  // tab data
  const data = [
    {
      name: 'Opportunities',
      component: <BrowseOpportunities
        locationFilter={locationFilter}
        oppTypeFilter={oppTypeFilter}
        orgTypeFilter={orgTypeFilter}
      />,
    },
    {
      name: 'People',
      component: <BrowsePeople
        locationFilter={locationFilter}
        oppTypeFilter={oppTypeFilter}
        orgTypeFilter={orgTypeFilter}
      />,
    },
  ];

  // reset filters when switching tabs
  React.useEffect(() => {
    setLocationFilter([]);
    setOppTypeFilter([]);
    setOrgTypeFilter([]);
  }, [tab]);

  return (
    <div className='Browse'>
      <Box sx={{display: 'flex'}}>
        <BrowseFilterDrawer
          filterType={tab == oppInd ? 'Opportunities': 'People'}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          oppTypeFilter={oppTypeFilter}
          setOppTypeFilter={setOppTypeFilter}
          orgTypeFilter={orgTypeFilter}
          setOrgTypeFilter={setOrgTypeFilter}
        />
        <Box component="main" sx={{flexGrow: 1}}>
          <TabBar
            data={data}
            tab={tab}
            setTab={setTab}
          />
        </Box>
      </Box>
    </div>
  );
}

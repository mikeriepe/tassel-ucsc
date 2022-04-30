import * as React from 'react';
import Box from '@mui/material/Box';
import PageHeader from '../components/PageHeader';
import CompressedTabBar from '../components/CompressedTabBar';

/**
 * creates approvals page
 * @return {HTML} approvals page
 */
export default function Approvals() {
  const [tab, setTab] = React.useState(0);
  const tabs = [
    {name: 'Opportunity', component: <p>Hello World</p>},
    {name: 'Requests', component: <p>Hello World</p>},
  ];
  return (
    <Box className='Approvals'>
      <PageHeader
        title='Approvals'
        subtitle='Approve or reject accounts and opportunities'
      />
      <CompressedTabBar data={tabs} tab={tab} setTab={setTab}/>
    </Box>
  );
}

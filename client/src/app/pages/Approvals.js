import * as React from 'react';
import Box from '@mui/material/Box';
import PageHeader from '../components/PageHeader';

/**
 * creates approvals page
 * @return {HTML} approvals page
 */
export default function Approvals() {
  return (
    <Box className='Approvals'>
      <PageHeader
        title='Approvals'
        subtitle='Approve or reject accounts and opportunities'
      />
    </Box>
  );
}

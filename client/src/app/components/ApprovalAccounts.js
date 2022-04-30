import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import '../stylesheets/ApprovalTable.css';

/**
 * creates account approval content
 * @return {HTML} account approval content
 */
export default function ApprovalAccounts() {
  return (
    <Box
      style={{
        backgroundColor: '#F8F8Fa',
        height: '100%',
        padding: '2rem',
      }}
    >
      <Paper
        elevation={0}
      >
        <Toolbar
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Typography variant='h4'>Search Bar</Typography>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            buttons
          </Box>
        </Toolbar>
        <Table
          style={{
            backgroundColor: 'white',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell id='table-head-cell'>Name</TableCell>
              <TableCell id='table-head-cell'>Email</TableCell>
              <TableCell id='table-head-cell'>Year</TableCell>
              <TableCell id='table-head-cell'>Status</TableCell>
              <TableCell id='table-head-cell'>box</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Colina Guan</TableCell>
              <TableCell>cobguan@ucsc.edu</TableCell>
              <TableCell>2022</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>box</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

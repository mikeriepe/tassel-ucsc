import * as React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemedButton from '../components/ThemedButton';
import PersonIcon from '@mui/icons-material/Person';
import {AppBar} from './NavBarComponents';

const drawerWidth = 240;

/**
 * logged out navbar
 * @return {*} NavBar Component
 */
export default function NavBarLoggedOut() {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          background: 'white',
          borderBottom: '0.5px solid #D1D1D1',
          boxShadow: '0',
          ml: {sm: `${drawerWidth}px`},
        }}
      >
        <Toolbar>
          {/* header */}
          <Link to='/'>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="secondary"
              style={{
                fontWeight: 600,
                fontStyle: 'italic',
                cursor: 'pointer',
              }}
            >
                Tassel
            </Typography>
          </Link>
          <Box sx={{flexGrow: 1}} />
          {/* icons */}
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            <Link to='/login'>
              <ThemedButton
                startIcon={<PersonIcon />}
                color={'gray'}
                variant={'cancel'}
                type={'submit'}
              >
                  Login
              </ThemedButton>
            </Link>
            <Link to='/signup'>
              <ThemedButton
                color={'yellow'}
                variant={'gradient'}
                type={'submit'}
                style={{marginLeft: '1rem'}}
              >
                  Join Now
              </ThemedButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

import * as React from 'react';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import MuiAvatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ThemedButton from './ThemedButton';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {profileStatusToText, profileStatusToColor} from '../util/ProfileStatus';
import CircularProgress from '@mui/material/CircularProgress';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {styled} from '@mui/material/styles';
import {toast} from 'react-toastify';
import '../stylesheets/ApprovalTable.css';

const Page = styled((props) => (
  <Box {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  height: 'auto',
  width: 'auto',
  marginInline: '3em',
  marginBlock: '1em',
}));

const Card = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5em 2em 1.5em 2em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Avatar = ({image}, props) => (
  <MuiAvatar
    {...props}
    src={image}
    sx={{
      height: '2.5rem',
      width: '2.5rem',
      border: '0.5px solid rgba(0, 0, 0, 0.15)',
      marginRight: '1rem',
    }}
  />
);

/**
 * row for account table
 * @param {*} props
 * @return {*} row object
 */
function Row(props) {
  const {row, handleSelect} = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className='data-cell' padding='checkbox'>
          <Checkbox value={row.useremail} onChange={handleSelect}/>
        </TableCell>
        <TableCell className='data-cell' padding='checkbox'>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* eslint-disable-next-line max-len */}
        <TableCell className='data-cell' component='th' scope='row'
          sx={{display: 'flex',
            flexDirection: 'row'}}>
          <Avatar image={row.profilepicture} />
          {/* eslint-disable-next-line max-len */}
          <div className='text-center-vert'>{`${row.firstname} ${row.lastname}`}</div>
        </TableCell>
        <TableCell className='data-cell'>{row.useremail}</TableCell>
        <TableCell className='data-cell'>{row.graduationyear}</TableCell>
        <TableCell className='data-cell'>
          <div style={{display: 'flex',
            flexDirection: 'row',
            color: profileStatusToColor(row.status)}}>
            <FiberManualRecordIcon sx={{
              fontSize: '1em',
              paddingTop: '.21rem',
              paddingRight: '.21rem'}}/>
            <div>{profileStatusToText(row.status)}</div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{margin: 1}}>
              <Typography variant='h1' component='div'>
                More Information
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/**
 * creates account approval content
 * @return {HTML} account approval content
 */
export default function ApprovalAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestInfo, setRequestInfo] = useState('');
  const [sortNameOrder, setSortNameOrder] = useState('');
  const [sortEmailOrder, setSortEmailOrder] = useState('');
  const [sortYearOrder, setSortYearOrder] = useState('');
  const [sortStatusOrder, setSortStatusOrder] = useState('');

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRequestInfo = (e) => {
    setRequestInfo(e.target.value);
    console.log(e.target.value);
  };

  const handleDialogSubmit = () => {
    const status = 2;
    const profiles = selected.map((profile) => {
      const info = accounts.find((account) => account.useremail == profile);
      info.status = status;
      info.requestinfo = requestInfo;
      return info;
    });
    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      console.log(profile);
      fetch(`/api/changeProfileStatusForRequest`, {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            console.log(res.json());
            setDialogOpen(false);
            setRequestInfo('');
            getAccounts('status', true);
          })
          .catch((err) => {
            console.log(err);
            alert('Error approving profiles, please try again');
          });
    }
  };

  const sortAccounts = (json, sortBy, reset) => {
    if (reset === true) {
      setAccounts(json.sort(function(a, b) {
        return a.status - b.status;
      }));
      setSortStatusOrder('asc');
      return;
    }
    if (sortBy === 'status') {
      if (sortStatusOrder === '') {
        console.log(sortStatusOrder);
        console.log('1');
        setAccounts(json.sort(function(a, b) {
          return a.status - b.status;
        }));
        setSortStatusOrder('asc');
      } else if (sortStatusOrder === 'asc') {
        console.log(sortStatusOrder);
        console.log('2');
        setAccounts(json.sort(function(a, b) {
          return b.status - a.status;
        }));
        setSortStatusOrder('desc');
      } else if (sortStatusOrder === 'desc') {
        console.log(sortStatusOrder);
        console.log('3');
        setAccounts(json.sort(function(a, b) {
          return a.status - b.status;
        }));
        setSortStatusOrder('asc');
      }
    }
    if (sortBy === 'name') {
      if (sortNameOrder === '') {
        setAccounts(json.sort(function(a, b) {
          return (a.firstname > b.firstname) ? 1 : -1;
        }));
        setSortNameOrder('asc');
      } else if (sortNameOrder === 'asc') {
        setAccounts(json.sort(function(a, b) {
          return (a.firstname > b.firstname) ? -1 : 1;
        }));
        setSortNameOrder('desc');
      } else if (sortNameOrder === 'desc') {
        setAccounts(json.sort(function(a, b) {
          return (a.firstname > b.firstname) ? 1 : -1;
        }));
        setSortNameOrder('asc');
      }
    }
    if (sortBy === 'email') {
      if (sortEmailOrder === '') {
        setAccounts(json.sort(function(a, b) {
          return (a.useremail > b.useremail) ? 1 : -1;
        }));
        setSortEmailOrder('asc');
      } else if (sortEmailOrder === 'asc') {
        setAccounts(json.sort(function(a, b) {
          return (a.useremail > b.useremail) ? -1 : 1;
        }));
        setSortEmailOrder('desc');
      } else if (sortEmailOrder === 'desc') {
        setAccounts(json.sort(function(a, b) {
          return (a.useremail > b.useremail) ? 1 : -1;
        }));
        setSortEmailOrder('asc');
      }
    }
    if (sortBy === 'year') {
      if (sortYearOrder === '') {
        setAccounts(json.sort(function(a, b) {
          return a.graduationyear - b.graduationyear;
        }));
        setSortYearOrder('asc');
      } else if (sortYearOrder === 'asc') {
        setAccounts(json.sort(function(a, b) {
          return b.graduationyear - a.graduationyear;
        }));
        setSortYearOrder('desc');
      } else if (sortYearOrder === 'desc') {
        setAccounts(json.sort(function(a, b) {
          return a.graduationyear - b.graduationyear;
        }));
        setSortYearOrder('asc');
      }
    }
  };

  const getAccounts = (sortBy, reset) => {
    fetch(`/api/getProfilesForApproval`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          sortAccounts(json, sortBy, reset);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving profiles, please try again');
        });
  };

  const handleSelect = (event) => {
    const email = event.target.value;
    const currentIndex = selected.indexOf(email);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(email);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    setSelected(newSelected);
  };

  const handleStatusAction = (event) => {
    let status = 1;
    switch (event.target.textContent) {
      case 'Approve':
        status = 4;
        break;
      case 'Request More Info':
        status = 2;
        break;
      case 'Deny':
        status = 99;
        break;
    }
    const profiles = selected.map((profile) => {
      const info = accounts.find((account) => account.useremail == profile);
      info.status = status;
      return info;
    });
    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      console.log(profile);
      fetch(`/api/changeProfileStatus`, {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            console.log(res.json());
            getAccounts('status', true);
            setSelected([]);
          })
          .catch((err) => {
            console.log(err);
            alert('Error approving profiles, please try again');
          });
    }
  };

  const handleAdminPromotion = (event) => {
    const profiles = selected.map((profile) => {
      const info = accounts.find((account) => account.useremail == profile);
      return info;
    });
    setLoading(true);
    // eslint-disable-next-line guard-for-in
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      fetch(`/api/userUpdatePromoteAdmin`, {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            console.log(res.json());
            getAccounts('status', true);
          })
          .catch((err) => {
            console.log(err);
            alert('Error creating admin, please try again');
          }); toast.success('Admin promoted successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSort = (rowId) => {
    setLoading(true);
    if (rowId === 'name') {
      getAccounts(rowId, false);
    }
    if (rowId === 'email') {
      getAccounts(rowId, false);
    }
    if (rowId === 'year') {
      getAccounts(rowId, false);
    }
    if (rowId === 'status') {
      getAccounts(rowId, false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAccounts('status', true);
  }, []);

  const getArrowDirection = (row) => {
    if (row === 'name') {
      return sortNameOrder;
    } else if (row === 'email') {
      return sortEmailOrder;
    } else if (row === 'year') {
      return sortYearOrder;
    } else if (row === 'status') {
      return sortStatusOrder;
    }
  };

  // TODO: make more fancy
  // https://mui.com/material-ui/react-table/#sorting-amp-selecting
  const headCells = [
    {
      id: 'name',
      disablePadding: false,
      label: 'Name',
    },
    {
      id: 'email',
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'year',
      disablePadding: false,
      label: 'Grad Yr',
    },
    {
      id: 'status',
      disablePadding: false,
      label: 'Status',
    },
  ];

  return (
    <Page>
      <Card style={{padding: '.5rem'}}>
        <Toolbar>
          <Box
            style={{
              marginRight: '1rem',
            }}
          >
            <ThemedButton
              color={'green'}
              variant={'gradient'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginRight: '.5rem',
              }}
              onClick={handleStatusAction}
            >
                Approve
            </ThemedButton>
            <ThemedButton
              color={'blue'}
              variant={'themed'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginRight: '.5rem',
              }}
              onClick={handleDialogOpen}
            >
              Request More Info
            </ThemedButton>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Request More Info</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Describe what other information you would like to
                  get from the selected users.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Information"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleRequestInfo}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleDialogSubmit}>Send Requests</Button>
              </DialogActions>
            </Dialog>
            <ThemedButton
              color={'gray'}
              variant={'themed'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginRight: '.5rem',
              }}
              onClick={handleStatusAction}
            >
            Deny
            </ThemedButton>
            <ThemedButton
              color={'yellow'}
              variant={'gradient'}
              type={'submit'}
              style={{
                fontSize: '0.875rem',
                marginRight: '.5rem',
              }}
              onClick={handleAdminPromotion}
            >
                Promote Admin
            </ThemedButton>
          </Box>
          {/* <Typography variant='h4'>Search Bar</Typography> */}
        </Toolbar>
      </Card>
      <Card>
        {
          loading ?
          <Box sx={{display: 'flex'}} style={{padding: '2rem'}}>
            <CircularProgress />
          </Box> :
          <Table
            style={{
              backgroundColor: 'white',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  // inputProps={{
                  //   'aria-label': 'select all desserts',
                  // }}
                  />
                </TableCell>
                <TableCell padding='checkbox'/>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    id='table-head-cell'
                    onClick={() => handleSort(headCell.id)}
                  >
                    <TableSortLabel
                    // active={orderBy === headCell.id}
                    // onClick={handleSort(headCell.id)}
                      /* eslint-disable-next-line max-len */
                      direction={getArrowDirection(headCell.id) !== '' ? getArrowDirection(headCell.id) : 'desc'}
                    >
                      {headCell.label}
                      {/* {orderBy === headCell.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {order === 'desc' ?
                        'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null} */}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                accounts.map((account) => {
                  return (
                    <Row
                      key={account.profileid}
                      row={account}
                      handleSelect={handleSelect}
                    />
                  );
                })
              }
            </TableBody>
            {/* TODO: footer with pagination and number selected */}
            {/* <TableFooter>
            <div
              style={{
                position: 'absolute',
                padding: '1rem',
                fontSize: '0.875rem',
                color: 'primary',
              }}
            >
              0 rows selected
            </div>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                colSpan={12}
                count={50}
                rowsPerPage={5}
                page={0}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
          </Table>
        }
      </Card>
    </Page>
  );
}

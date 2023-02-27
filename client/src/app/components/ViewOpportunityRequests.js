import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {visuallyHidden} from '@mui/utils';
import {alpha} from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import ThemedButton from './ThemedButton';
import ViewOpportunityRequestCard from './ViewOpportunityRequestCard';
import useAuth from '../util/AuthContext';

/**
 * Create request data
 * @param {*} name
 * @param {*} role
 * @param {*} dateOfRequest
 * @param {*} status
 * @return {Object}
 */
function createData(name, role, dateOfRequest, status) {
  return {
    name,
    role,
    dateOfRequest,
    status,
  };
}

const rows = [
  createData('Bob Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Bill Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Ben Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Jen Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
  createData('Jill Dude', 'Leader A', 'Wed, Dec 15, 2021 @ 12:30pm', 'pending'),
];

/**
 * Descending comparator
 * @param {*} a
 * @param {*} b
 * @param {*} orderBy
 * @return {Number}
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Get comparator
 * @param {*} order
 * @param {*} orderBy
 * @return {Function}
 */
function getComparator(order, orderBy) {
  return order === 'desc' ?
    (a, b) => descendingComparator(a, b, orderBy) :
    (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Requested Role',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date of Request',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

/**
 * Table head
 * @return {JSX}
 */
function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  onRequestSort,
  requests,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  let numberOfPendings = 0;
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].status === 'Pending') {
      numberOfPendings++;
    }
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < numberOfPendings}
            checked={numSelected > 0 && numSelected === numberOfPendings}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all requests',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <span className='text-bold'>{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};


/**
 * @return {JSX}
 */
function EnhancedTableToolbar({
  numSelected,
  selected,
  requests,
  updateRequests,
  resetSelected,
}) {
  const approveRequests = async () => {
    // prepare the post data
    // required params requestId and opportunityid
    // right now it will only approve one request
    // a for loop is required to approve multiple requests
    const selectedRequests = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < requests.length; j++) {
        if (selected[i] === requests[j].requester) {
          // push the request and its index
          selectedRequests.push([requests[j], j]);
        }
      }
    }

    for (let i = 0; i < selectedRequests.length; i++) {
      const toBeApproved = {
        requestId: selectedRequests[i][0].requestid,
        opportunityid: selectedRequests[i][0].opportunityid,
        requester: selectedRequests[i][0].requester,
        role: selectedRequests[i][0].role,
      };
      console.log(toBeApproved);
      await fetch(`/api/approveRequest`, {
        method: 'POST',
        body: JSON.stringify(toBeApproved),
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
          })
          .catch((err) => {
            console.log(err);
          });
    }
    const updatedRequests = [...requests];
    for (let i = 0; i < selectedRequests.length; i++) {
      updatedRequests[selectedRequests[i][1]].requeststatus = 'approved';
      updatedRequests[selectedRequests[i][1]].status = 'Approved';
    }
    updateRequests(updatedRequests);
    resetSelected();
  };

  const denyRequests = async () => {
    const selectedRequests = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < requests.length; j++) {
        if (selected[i] === requests[j].requester) {
          // push the request and its index
          selectedRequests.push([requests[j], j]);
        }
      }
    }
    for (let i = 0; i < selectedRequests.length; i++) {
      const toBeRejected = {
        requestId: selectedRequests[i][0].requestid,
        // opportunityid: request.opportunityid,
      };
      await fetch(`/api/rejectRequest`, {
        method: 'POST',
        body: JSON.stringify(toBeRejected),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((json) => {
          })
          .catch((err) => {
            console.log(err);
          });
    }
    const updatedRequests = [...requests];
    for (let i = 0; i < selectedRequests.length; i++) {
      updatedRequests[selectedRequests[i][1]].requeststatus = 'rejected';
      updatedRequests[selectedRequests[i][1]].status = 'Denied';
    }
    updateRequests(updatedRequests);
    resetSelected();
  };
  /*
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
            getPendingOpportunities();
            getAllOpportunities();
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
  */

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <h4 className='text-blue' style={{flex: '1 1 100%'}}>
          {numSelected} selected
        </h4>
      ) : (
        <h4 className='text-dark' style={{flex: '1 1 100%'}}>
          Requests
        </h4>
      )}

      {numSelected > 0 ? (
        <Box
          className='flex-horizontal flex-flow-large'
          sx={{marginRight: '5px'}}
        >
          <ThemedButton
            color='yellow'
            variant='gradient'
            size='small'
            onClick={() => {
              approveRequests();
              // console.log(selected);
              // console.log(requests);
            }}
          >
            Approve
          </ThemedButton>
          <ThemedButton
            color='gray'
            variant='themed'
            size='small'
            onClick={() => {
              denyRequests();
              // console.log(selected);
              // console.log(requests);
            }}
          >
            Deny
          </ThemedButton>
        </Box>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

/**
 * @return {JSX}
 */
export default function FetchWrapper() {
  const params = useParams();
  const {userProfile} = useAuth();
  const [requests, setRequests] = useState([]);

  const getPendingRequestsReceived = () => {
    fetch(`/api/getPendingRequestsReceived/` +
    `${userProfile.profileid}/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          if (json.length > 0) {
            json.map((request) => request.status = 'Pending'),
            setRequests((prevRequests) => ([
              ...prevRequests,
              ...json,
            ]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getApprovedRequests = () => {
    fetch(`/api/getApprovedRequests/` +
    `${userProfile.profileid}/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          if (json.length > 0) {
            json.map((request) => request.status = 'Approved'),
            setRequests((prevRequests) => ([
              ...prevRequests,
              ...json,
            ]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getRejectedRequests = () => {
    fetch(`/api/getRejectedRequests/` +
    `${userProfile.profileid}/${params.opportunityid}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          if (json.length > 0) {
            json.map((request) => request.status = 'Denied'),
            setRequests((prevRequests) => ([
              ...prevRequests,
              ...json,
            ]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const updateRequests = (updatedRequests) => {
    setRequests(updatedRequests);
  };

  useEffect(() => {
    getPendingRequestsReceived();
    getApprovedRequests();
    getRejectedRequests();
  }, []);

  return (
    <>
      {requests && <ViewOpportunityRequests
        requests={requests}
        updateRequests={updateRequests}
      />}
    </>
  );
}

/**
 * Enhanced table
 * @return {JSX}
 */
function ViewOpportunityRequests({requests, updateRequests}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [requester, setRequester] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelecteds = rows.map((n) => n.name);
      const newSelecteds = [];
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].status === 'Pending') {
          newSelecteds.push(requests[i].requester);
        }
      }
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const resetSelected = () => {
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{width: 'auto'}}>
      <Paper
        elevation={0}
        sx={{
          width: 'auto',
          mt: '1em',
          boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
          border: '0.5px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          requests={requests}
          updateRequests={updateRequests}
          resetSelected={resetSelected}
        />
        <TableContainer>
          <Table aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              requests={requests}
            />
            <TableBody>
              {requests
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request, index) => {
                    const isItemSelected = isSelected(request.requester);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <ViewOpportunityRequestCard
                        key={`request-${index}`}
                        request={request}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        handleClick={handleClick}
                      />
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

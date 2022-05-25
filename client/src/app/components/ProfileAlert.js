import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import '../stylesheets/MyProfile.css';
/**
 * creates ProfileAlert
 * @return {HTML} Alert component
 */
export default function ProfileAlert({data}) {
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const handleDialog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleViewDialog = () => {
    setOpenView(true);
  };
  const handleViewDialogClose = () => {
    setOpenView(false);
  };

  const handleSubmit = async (e) => {
    console.log(data.profileid);
    e.preventDefault();
    const body = {
      status: 3,
      response: response,
      profileid: data.profileid,
    };
    console.log(body);
    fetch(`/api/changeProfileRequestResponse`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          console.log(res.json());
          setOpen(false);
          setResponse('');
        })
        .catch((err) => {
          console.log(err);
          alert('Error submitting your response, please try again');
        });
  };

  return (
    <div>
      {data.status == 1 &&
        <Alert severity="success" className="alert-text">
            Your account is <strong>pending</strong>.
        </Alert>
      }
      {data.status == 99 &&
        <Alert severity="warning">
            Your account has been <strong>denied</strong> by an admin.
        </Alert>
      }
      {data.status == 4 &&
        <Alert severity="success">
          You have been <strong>approved</strong> by an admin!
        </Alert>
      }
      {data.status == 2 &&
        <Alert
          style={{width: '800px'}}
          severity="info"
          icon={<InfoIcon fontSize="inherit" className='alert-text' />}
          action={
            <Button onClick={handleDialog} color="inherit" size="small">
              <div className='alert-button-text'>Respond</div>
            </Button>
          }
        >
          <div className='alert-text' color="info">
            An admin has <strong>requested more info</strong>
          </div>
        </Alert>
      }
      {data.status == 3 &&
        <Alert
          style={{width: '800px'}}
          icon={<CheckIcon fontSize="inherit" className='alert-text' />}
          severity="info"
          color="info"
          action={
            <div>
              {data.status == 2 &&
              <Button onClick={handleViewDialog} color="info" size="small">
                <div className='alert-button-text'>View</div>
              </Button>
              }
              {data.status == 3 &&
              <Button onClick={handleViewDialog} color="info" size="small">
                <div className='alert-button-text'></div>
              </Button>
              }
            </div>
          }
        >
          <div className='alert-text' color="info">
            You have responded to <strong>request for more info</strong>
          </div>
        </Alert>
      }

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className='alert-text'>
            Respond to request for more info:
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            An admin has requested for more info: {data.requestinfo}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="response"
            label="Your response:"
            type="text"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openView} onClose={handleViewDialogClose}>
        <DialogTitle>
          <div className='alert-text'>
            View your response to the following request:
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {data.requestinfo}:
          </DialogContentText>
          <TextField
            disabled
            value={data.requestresponse}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

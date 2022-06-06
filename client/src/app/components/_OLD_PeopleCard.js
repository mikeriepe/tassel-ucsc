import * as React from 'react';
import {ListItem, IconButton, Menu, MenuItem} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import BusinessCenterOutlined from '@mui/icons-material/BusinessCenterOutlined';
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined';
import StarOutlineOutlined from '@mui/icons-material/StarOutlineOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VolunteerActivismOutlined
  from '@mui/icons-material/VolunteerActivismOutlined';
import '../stylesheets/_OLD_Opportunities.css';
import ThemedButton from './ThemedButton';

/**
 * @param {*} data
 * @return {HTML} People card component
 */
export default function PeopleCard({data}) {
  return (
    <ListItem
      sx={{
        display: 'flex',
        cursor: 'pointer',
      }}
      disablePadding
    >
      <Card
        sx={{
          display: 'flex',
          height: '275px',
          width: '100%',
          boxShadow: '0',
          borderRadius: '10px',
          outline: '0.5px solid #d1d1d1',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            padding: '0',
            height: '100%',
            width: '100%',
          }}
        >
          <div className='people-card-left'>
            <div className='people-card-left-avatar'>
              <Avatar
                src={'p'}
                alt='Remy Sharp'
                sx={{
                  marginBottom: '1em',
                  height: '125px',
                  width: '125px',
                }}
              />
            </div>
            <div className='people-card-left-events'>
              <EventNoteOutlined className='people-card-left-icons' />
              <div className='people-card-left-text'>
                {`${data.events} Events`}
              </div>
            </div>
            <div className='people-card-left-recommendations'>
              <StarOutlineOutlined className='people-card-left-icons' />
              <div className='people-card-left-text'>
                {`${data.recommendations} Recommendations`}
              </div>
            </div>
            <div className='people-card-left-time'>
              <AccessTimeOutlined className='people-card-left-icons' />
              <div className='people-card-left-text'>
                {`Within ${data.availability} Hours`}
              </div>
            </div>
          </div>
          <div className='people-card-right'>
            <div className='people-card-right-name'>
              {data.name}
            </div>
            <div className='people-card-right-major'>
              {data.major}
            </div>
            <div className='people-card-right-group'>
              <div className='people-card-right-work'>
                <div className='people-card-right-work-icon'>
                  <BusinessCenterOutlined />
                </div>
                <div className='people-card-right-text'>
                  {data.work.map((experience, index) => (
                    <div
                      className='people-card-right-text-inner'
                      key={`volunteer-${index}`}
                    >
                      <div className='people-card-right-text organization'>
                        {experience.organization}
                      </div>
                      <div className='people-card-right-text position'>
                        {experience.position}
                      </div>
                      <div className='people-card-right-text years'>
                        {experience.years}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='people-card-right-volunteer'>
                <div className='people-card-right-icon'>
                  <VolunteerActivismOutlined />
                </div>
                <div className='people-card-right-text'>
                  {data.volunteer.map((experience, index) => (
                    <div
                      className='people-card-right-text-inner'
                      key={`work-${index}`}
                    >
                      <div className='people-card-right-text organization'>
                        {experience.organization}
                      </div>
                      <div className='people-card-right-text position'>
                        {experience.position}
                      </div>
                      <div className='people-card-right-text years'>
                        {experience.years}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <LongMenu />
      </Card>
    </ListItem>
  );
}

/**
 * Menu
 * @return {Object} JSX
 */
function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [checkedList, setCheckedList] = React.useState([]);
  const [itemsChecked, setItemsChecked] = React.useState(false);

  const open = Boolean(anchorEl);
  const menuId = 'opportunity-menu';

  // Array of opportunity names
  const exampleData = [
    {
      name: 'Beach Cleanup',
      id: 0,
    },
    {
      name: 'Marine Biology Club Charity',
      id: 1,
    },
    {
      name: 'Save The Sea Turtles Banquet',
      id: 2,
    },
  ];

  React.useEffect(() => {
    setItems(exampleData);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, action) => {
    setCurrentItem(action);
    setIsModalOpen(true);
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
    setItemsChecked(false);
    setCheckedList([]);
  };

  const handleInviteClick = () => {
    // Send invite here
    // Access opportunities with:
    // const opportunities = data.filter((opportunity) =>
    //   checkedList.includes(opportunity.id)
    // );

    const opportunities = exampleData.filter((opportunity) =>
      checkedList.includes(opportunity.id),
    );

    console.log(opportunities);

    setCurrentItem(null);
    setIsModalOpen(false);
    setItemsChecked(false);
    setCheckedList([]);
  };

  const handleCheckboxClick = (e) => {
    const {value, checked} = e.target;

    if (checked) {
      setCheckedList([...checkedList, value * 1]);
    } else {
      setCheckedList(checkedList.filter((item) => item != value));
    }
  };

  const selectAll = (e) => {
    const {checked} = e.target;
    const collection = [];

    if (checked) {
      for (const item of items) {
        collection.push(item.id);
      }
    }

    setCheckedList(collection);
    setItemsChecked(checked);
  };

  return (
    <div>
      <IconButton
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenuClick}
        sx={{
          margin: '0.5em',
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleMenuClose}
      >
        <div>
          <MenuItem
            onClick={(event) => handleMenuItemClick(event, 'Invite')}
          >
            Invite
          </MenuItem>
        </div>
      </Menu>
      {currentItem && currentItem === 'Invite' ? (
        <InviteModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          items={items}
          itemsChecked={itemsChecked}
          selectAll={selectAll}
          checkedList={checkedList}
          handleCheckboxClick={handleCheckboxClick}
          handleInviteClick={handleInviteClick}
        />
      ) : null}
    </div>
  );
}

/**
 * Modal for invite request
 * @param {Object} props
 * @return {Object} JSX
 */
function InviteModal(props) {
  const {
    isModalOpen,
    handleModalClose,
    items,
    itemsChecked,
    selectAll,
    checkedList,
    handleCheckboxClick,
    handleInviteClick,
  } = props;

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
    >
      <Paper
        sx={{
          position: 'absolute',
          padding: '1.5em',
          top: '50%',
          left: '50%',
          height: 'auto',
          width: '600px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 0px 50px -14px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <div className='invite-title'>
          Invite to Event
        </div>
        <div className='invite-subtitle'>
          Your Events:
        </div>
        <div className='invite-checkboxes'>
          <header>
            <label>
              <Checkbox
                value={'all'}
                checked={itemsChecked}
                onClick={(event) => selectAll(event)}
              />
              Select all
            </label>
          </header>
          {items.map((item) => {
            return (
              <div key={item.id}>
                <Checkbox
                  value={item.id}
                  checked={checkedList.includes(item.id)}
                  onChange={handleCheckboxClick}
                />
                {item.name}
              </div>
            );
          })}
        </div>
        <div className='invite-buttons'>
          <div className='invite-buttons-request'>
            <ThemedButton
              color={'yellow'}
              variant={'themed'}
              onClick={handleInviteClick}
            >
              Send Invite Request
            </ThemedButton>
          </div>
          <div className='invite-buttons-cancel'>
            <ThemedButton
              color={'gray'}
              variant={'cancel'}
              onClick={handleModalClose}
            >
              Cancel
            </ThemedButton>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}

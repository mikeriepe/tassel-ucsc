import * as React from 'react';
import {useState, useEffect} from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import SchoolIcon from '@mui/icons-material/School';
import '../stylesheets/FilterDrawer.css';

/**
 * returns drawer with filters for opportunities
 * @param {*} props stores set functions
 * @return {HTML} filter drawer component
 */
export default function BrowseFilterDrawer(props) {
  const drawerWidth = 300;

  // get all the props for fields and their set functions
  const {
    filterType,
    locationFilter,
    setLocationFilter,
    oppTypeFilter,
    setOppTypeFilter,
    orgTypeFilter,
    setOrgTypeFilter,
  } = props;

  // get filter lists from the database
  const locations = ['In-Person', 'Remote', 'Hybrid'];
  const [oppTypes, setOppTypes] = useState([]);
  const [orgTypes, setOrgTypes] = useState([]);

  useEffect(() => {
    getOpportunityTypes();
    getOrganizationTypes();
  }, []);

  const getOpportunityTypes = () => {
    fetch(`/api/getOpportunityTypes`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const tempOppTypes = json.map((elem) => (elem.name));
          setOppTypes(tempOppTypes);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving opportunity types');
        });
  };

  const getOrganizationTypes = () => {
    fetch(`/api/getOrganizationTypes`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          const tempOrgTypes = json.map((elem) => (elem.name));
          setOrgTypes(tempOrgTypes);
        })
        .catch((err) => {
          console.log(err);
          alert('Error retrieving organization types');
        });
  };

  // CHECKBOX HANDLING ----------------------------------------------

  // handle checkboxes for location
  const handleToggleLocation = (value) => () => {
    const currentIndex = locationFilter.indexOf(value);
    const newOppFilterLocation = [...locationFilter];

    if (currentIndex === -1) {
      newOppFilterLocation.push(value);
    } else {
      newOppFilterLocation.splice(currentIndex, 1);
    }
    setLocationFilter(newOppFilterLocation);
  };

  // handle checkboxes for opp types
  const handleToggleOppType = (value) => () => {
    const currentIndex = oppTypeFilter.indexOf(value);
    const newOppFilterType = [...oppTypeFilter];

    if (currentIndex === -1) {
      newOppFilterType.push(value);
    } else {
      newOppFilterType.splice(currentIndex, 1);
    }
    setOppTypeFilter(newOppFilterType);
  };

  // handle checkboxes for org types
  const handleToggleOrgType = (value) => () => {
    const currentIndex = orgTypeFilter.indexOf(value);
    const newOrgTypeFilter = [...orgTypeFilter];

    if (currentIndex === -1) {
      newOrgTypeFilter.push(value);
    } else {
      newOrgTypeFilter.splice(currentIndex, 1);
    }
    setOrgTypeFilter(newOrgTypeFilter);
  };

  // COLLAPSE HANDLING ----------------------------------------------

  // handle collapse for location
  const [openLocation, setOpenLocation] = React.useState(false);
  const handleClickLocation = () => {
    setOpenLocation(!openLocation);
  };

  // handle collapse for type
  const [openOppType, setOpenOppType] = React.useState(false);
  const handleClickOppType = () => {
    setOpenOppType(!openOppType);
  };

  // handle collapse for org type
  const [openOrgType, setOpenOrgType] = React.useState(false);
  const handleClickOrgType = () => {
    setOpenOrgType(!openOrgType);
  };

  // RETURN OBJECT -------------------------------------------------

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]:
              {width: drawerWidth, boxSizing: 'border-box'},
      }}
    >
      <Toolbar className='toolbar'/>
      <Box sx={{overflow: 'auto'}}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Filters for {filterType}
            </ListSubheader>
          }
        >
          {/* Locations */}
          <ListItemButton onClick={handleClickLocation}>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Location" />
            {openLocation ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openLocation} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {locations.map((value) => {
                return (
                  <CheckboxListItem
                    key={value}
                    value={value}
                    handleToggle={handleToggleLocation}
                    checked={locationFilter}
                  />
                );
              })}
            </List>
          </Collapse>
          {/* Opp Types */}
          <ListItemButton onClick={handleClickOppType}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Opportunity Types" />
            {openOppType ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openOppType} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {oppTypes.map((value) => {
                return (
                  <CheckboxListItem
                    key={value}
                    value={value}
                    handleToggle={handleToggleOppType}
                    checked={oppTypeFilter}
                  />
                );
              })}
            </List>
          </Collapse>
          {/* Org Types */}
          <ListItemButton onClick={handleClickOrgType}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Organization Types" />
            {openOrgType ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openOrgType} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {orgTypes.map((value) => {
                return (
                  <CheckboxListItem
                    key={value}
                    value={value}
                    handleToggle={handleToggleOrgType}
                    checked={orgTypeFilter}
                  />
                );
              })}
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );

  /**
   * component for checkbox list item
   * @param {*} props stores value for checkbox list item
   * @return {*} list item with checkbox
   */
  function CheckboxListItem(props) {
    const {value, handleToggle, checked} = props;
    const labelId = `checkbox-list-label-${value}`;
    return (
      <ListItemButton
        key={value}
        role={undefined}
        onClick={handleToggle(value)}
        sx={{pl: 4}}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{'aria-labelledby': labelId}}
          />
        </ListItemIcon>
        <ListItemText primary={value} />
      </ListItemButton>
    );
  }
}

import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import {Grid} from '@mui/material';


/**
 * AddressForm Component
 * @return {html} Address Form
 */
export default function AddressForm({newOpportunity, setNewOpportunity}) {
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setNewOpportunity({...newOpportunity, ['eventlocation']: {
      ...(newOpportunity.eventlocation ?? {}),
      address: e.target.value}});
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setNewOpportunity({...newOpportunity, ['eventlocation']: {
      ...(newOpportunity.eventlocation ?? {}),
      city: e.target.value}});
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setNewOpportunity({...newOpportunity, ['eventlocation']: {
      ...(newOpportunity.eventlocation ?? {}),
      state: e.target.value}});
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
    setNewOpportunity({...newOpportunity, ['eventlocation']: {
      ...(newOpportunity.eventlocation ?? {}),
      zip: e.target.value}});
  };

  return (
    <form>
      <Grid container spacing={1} sx={{width: '315px'}}>
        <Grid item xs={4} md={12} lg={12} xl={12}>
          <TextField
            name='address'
            label='Enter Address'
            value={address}
            onChange={handleAddressChange}
            sx={{
              width: '100%',
              backgroundColor: 'rgb(255, 255, 255)',
            }}
          />
        </Grid>
        <Grid item xs={4} md={12} lg={12} xl={12}>
          <TextField
            name='city'
            label='Enter City'
            value={city}
            onChange={handleCityChange}
            sx={{display: 'flex',
              position: 'relative',
              backgroundColor: 'rgb(255, 255, 255)',
            }}
          />
        </Grid>
        <Grid item xs={6} md={7}>
          <TextField
            name='state'
            label='Enter State/Province/Region'
            value={state}
            onChange={handleStateChange}
            sx={{display: 'flex',
              position: 'relative',
              backgroundColor: 'rgb(255, 255, 255)',
            }}
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <TextField
            name='zip'
            label='Enter Zipcode'
            value={zip}
            onChange={handleZipChange}
            sx={{display: 'flex',
              position: 'relative',
              width: '100%',
              backgroundColor: 'rgb(255, 255, 255)',
            }}
          />
        </Grid>
      </Grid>
    </form>);
}

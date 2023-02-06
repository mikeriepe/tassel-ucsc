import React from 'react';
// import {Controller, useFormContext} from 'react-hook-form';
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export const DateInput = ({name, control, label}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, value},
        fieldState: {error},
        formState,
      }) => (
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          name={name}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params}
            sx={{
              input: {color: '#fdc700'},
              backgroundColor: 'rgb(255, 255, 255)',
              marginBottom: '10px',
            }}/>}
        />
      )}
    />
  );
};

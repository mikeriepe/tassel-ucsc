import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';


export const TimeInput = ({name, control, label}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, value},
        fieldState: {error},
        formState,
      }) => (
        <TimePicker
          onChange={onChange}
          value={value}
          label={label}
          timeFormat="HH:mm"
          name={name}
          renderInput={(params) => <TextField {...params}
            sx={{
              input: {color: '#fdc700'},
              backgroundColor: 'rgb(255, 255, 255)',
              marginBottom: '10px',
            }}
          />}
        />
      )}
    />
  );
};

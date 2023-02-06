import React, {useEffect} from 'react';
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

export const TimeInput = ({name, control, label, register}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, value},
        fieldState: {error},
        formState,
      }) => (
        <Box>
          <TimePicker
            onChange={(e) => {
              console.log(e);
              const time = new Date(e);
              onChange(time);
            }}
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
          <FormHelperText error={!!error}>
            {error ? error.message : ''}
          </FormHelperText>
        </Box>
      )}
    />
  );
};

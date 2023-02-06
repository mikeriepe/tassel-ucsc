import React from 'react';
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

export const DateInput = ({name, control, label, register}) => {
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
          <DesktopDatePicker
            minDate={new Date()}
            label={label}
            inputFormat="MM/dd/yyyy"
            name={name}
            value={value}
            {...register(name)}
            onChange={(date) => {
              // set date time to midnight
              date.setHours(0, 0);
              onChange(date);
            }}
            renderInput={(params) => <TextField {...params}
              name={name}
              sx={{
                input: {color: '#fdc700'},
                backgroundColor: 'rgb(255, 255, 255)',
                marginBottom: '5px',
              }}/>}
          />
          <FormHelperText error={!!error}>
            {error ? error.message : ''}
          </FormHelperText>
        </Box>
      )}
    />
  );
};

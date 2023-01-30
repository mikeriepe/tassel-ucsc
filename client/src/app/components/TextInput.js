import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import TextField from '@mui/material/TextField';

export const TextInput = ({name, control, label}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, value},
        fieldState: {error},
        formState,
      }) => (
        <TextField
          sx={{
            input: {color: '#fdc700'},
            backgroundColor: 'rgb(255, 255, 255)',
            marginBottom: '10px',
          }}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant='outlined'
        />
      )}
    />
  );
};

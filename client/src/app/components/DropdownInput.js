import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useFormContext, Controller} from 'react-hook-form';

export const DropdownInput = ({
  name,
  control,
  label,
  options,
  customOnChange,
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl sx={{width: '-webkit-fill-available'}}>
      <InputLabel id='select-label'>{label}</InputLabel>
      <Controller
        render={({field: {onChange, value}}) => (
          <Select
            sx={{
              input: {color: '#fdc700'},
              backgroundColor: 'rgb(255, 255, 255)',
              marginBottom: '10px',
            }}
            label={label}
            labelId='select-label'
            onChange={(e) => {
              if (customOnChange) {
                customOnChange(e);
              }
              onChange(e);
            }}
            value={value}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

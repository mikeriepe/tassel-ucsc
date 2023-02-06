import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {Controller} from 'react-hook-form';


export const RadioInput = ({
  name,
  control,
  label,
  options,
  customOnChange,
  defaultValue,
}) => {
  const generateRadioOptions = () => {
    return options.map((option) => (
      <FormControlLabel
        key={option.value}
        value={option.value}
        label={option.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel name={name}
        sx={{
          fontSize: '16pt',
          marginRight: '20px',
        }}>
        {label}:
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: {onChange, value},
          fieldState: {error},
          formState,
        }) => (
          <RadioGroup
            value={value}
            onChange={(e) => {
              if (customOnChange) {
                customOnChange(e);
              }
              onChange(e);
            }}
            defaultValue={defaultValue}
          >
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

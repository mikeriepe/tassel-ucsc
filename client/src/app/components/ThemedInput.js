import React, {useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * Themed input
 * @return {JSX}
 */
export default function ThemedInput({placeholder, type}) {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputStyling = {
    paddingInline: '10px',
    height: '40px',
    width: '100%',
    borderRadius: '15px',
    fontFamily: 'Montserrat',
    fontSize: '0.8rem',
    fontWeight: '600',
  };

  const visibilityStyling = {
    marginRight: '10px',
    fontSize: '20px',
    color: '#8B95A5',
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
    >
      <OutlinedInput
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        sx={{...inputStyling, display: type === 'text' ? null : 'none'}}
      />
      <OutlinedInput
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
              disableRipple
            >
              {showPassword ?
                <VisibilityOff sx={visibilityStyling} /> :
                <Visibility sx={visibilityStyling} />
              }
            </IconButton>
          </InputAdornment>
        }
        sx={{...inputStyling, display: type === 'password' ? null : 'none'}}
      />
    </Box>
  );
}

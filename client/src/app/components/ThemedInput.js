import React, {useState, useContext, createContext} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const InputContext = createContext();
export const useInputContext = () => useContext(InputContext);

/**
 * Themed input
 * @return {JSX}
 */
export default function ThemedInput({placeholder, type, index, step, func}) {
  const value = useInputContext();
  const [values, setValues] = value;
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
    setValues((prevValues) => ({
      ...prevValues,
      [step]: {...prevValues[step], [index]: e.target.value},
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      func();
    }
  };

  return (
    <>
      <OutlinedInput
        placeholder={placeholder}
        type={type}
        value={values[index]}
        onChange={handleChange}
        onKeyDown={func !== undefined ? handleEnter : null}
        sx={{...inputStyling, display: type === 'text' ? null : 'none'}}
      />
      <OutlinedInput
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        value={values[index]}
        onChange={handleChange}
        onKeyDown={func !== undefined ? handleEnter : null}
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
    </>
  );
}

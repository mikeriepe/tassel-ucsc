import * as React from 'react';
import Button from '@mui/material/Button';
import {ThemeProvider, createTheme, useTheme} from '@mui/material/styles';

const ButtonTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: {variant: 'themed'},
          style: {
            fontFamily: 'Montserrat',
            fontWeight: '600',
            textTransform: 'none',
            boxShadow: 'none',
            color: 'white',
          },
        },
        {
          props: {variant: 'cancel'},
          style: {
            fontFamily: 'Montserrat',
            fontWeight: '600',
            textTransform: 'none',
            boxShadow: 'none',
            backgroundColor: 'white',
          },
        },
      ],
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
      },
    },
  },
});

/**
 * Themed Button
 * @param {Object} children 'Button content'
 * @param {String} color 'yellow' || 'blue' || 'gray' - Default to 'blue'
 * @param {String} variant 'themed' || 'cancel' - Default to MUI button
 * @param {Object} props 'Any MUI Button props'
 * @return {Object} JSX
 */
export default function ThemedButton({children, color, variant, ...props}) {
  const theme = useTheme();
  const blue = theme.palette.primary;
  const yellow = theme.palette.secondary;
  const gray = theme.palette.tertiary;

  const themedStyling = {
    'padding': '8px 22px',
    'fontSize': '0.9375rem',
    'backgroundColor':
      color === 'yellow' ? yellow.main :
      color === 'gray' ? gray.main :
      blue.main,
    '&:hover': {
      backgroundColor:
        color === 'yellow' ? yellow.main :
        color === 'gray' ? gray.main :
        blue.main,
    },
    '&:disabled': {
      backgroundColor: '#ebedf0',
      color: gray.main,
    },
  };

  const cancelStyling = {
    'padding': '8px 22px',
    'fontSize': '0.9375rem',
    'color':
      color === 'yellow' ? yellow.main :
      color === 'gray' ? gray.main :
      blue.main,
    'outline':
      color === 'yellow' ? `1px solid ${yellow.main}` :
      color === 'gray' ? `1px solid ${gray.main}` :
      `1px solid ${blue.main}`,
    '&:hover': {
      backgroundColor: 'white',
    },
  };

  return (
    <ThemeProvider theme={ButtonTheme}>
      <Button
        {...props}
        variant={variant}
        sx={
          variant === 'themed' ? themedStyling :
          variant === 'cancel' ? cancelStyling :
          null
        }
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}

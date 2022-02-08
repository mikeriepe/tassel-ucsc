import { createTheme } from '@mui/material/styles';

const themeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#fafafa',
      },
      secondary: {
        main: '#2196f3',
      },
    },
};

const theme = createTheme(themeOptions);

export default theme;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import theme from './app/Theme';
import { ThemeProvider } from '@mui/material/styles';

render((
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </BrowserRouter>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

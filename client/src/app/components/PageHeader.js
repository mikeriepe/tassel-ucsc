import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/**
 * modular component, page header
 * @param {*} param0 attributes for page header
 * @return {*} page header
 */
export default function PageHeader({title, subtitle, rightComponent}) {
  return (
    <Paper
      elevation={0}
      style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 0,
        padding: '2.5rem',
      }}
    >
      <div>
        <Typography
          variant='h4'
          style={{fontWeight: 600}}
          color='#424242'
        >
          {title}
        </Typography>
        <Typography
          variant='p'
          style={{fontWeight: 600}}
        >
          {subtitle}
        </Typography>
      </div>
      {rightComponent}
    </Paper>
  );
}

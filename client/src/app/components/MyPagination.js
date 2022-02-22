import React from 'react';
import {Pagination} from '@mui/material';
// import {useState} from 'react';
/**
 * creates pagination
 * @return {HTML} pagination
 */
export default function MyPagination({postsPerPage, totalPosts, paginate}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <Pagination
        count={pageNumbers.length}
        color="primary"
        variant="outlined"
        onChange={(event, value)=>paginate(value)}
      />
    </div>
  );
};

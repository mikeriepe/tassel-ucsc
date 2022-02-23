import * as React from 'react';
import '../stylesheets/Browse.css';

import useAuth from '../util/AuthContext';

/**
 * returns Browsing page
 * @return {HTML} Browse component
 */
export default function Browse() {
  // testing context
  const auth = useAuth();
  console.log(auth);

  return (
    <div className='Browse'>
      <h1>Browse</h1>
    </div>
  );
}

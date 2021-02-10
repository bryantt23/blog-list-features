import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <Link to={'/blogs'}>blogs</Link> <Link to={'/users'}>users</Link>
    </div>
  );
}

export default Navigation;

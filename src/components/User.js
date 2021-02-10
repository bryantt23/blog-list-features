import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function User({ user }) {
  console.log(user);
  //   <Link to=`/users/${user.id}`></Link>
  return (
    <tr>
      <td>
        <Link to={`/users/${user._id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  );
}

export default User;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUsers } from '../reducers/userReducer';
import { getAllUsers } from '../services/users';
import User from './User';

function Users() {
  const dispatch = useDispatch();
  let users = useSelector(state => state.user);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getAllUsers();
      dispatch(getUsers(response));
    }

    fetchMyAPI();

    //   const baseUrl = 'http://localhost:3001/api/users/';
    //   const request = await fetch(baseUrl);
    //   const res = await request.json();
    //   console.log(res);
    //   dispatch({
    //     type: 'GET_USERS',
    //     payload: res
    //   });
    //   return res;
  }, [dispatch]);

  console.log('users   ', users);
  console.log('users   ', typeof users);
  console.log('users.users   ', users.users);
  //  {
  //    JSON.stringify(users);
  //  }
  return (
    <div>
      <h1>Users</h1>
      <table>
        <th>
          <td>Name</td>
          <td>blogs</td>
        </th>
        {users &&
          users.users &&
          Object.values(users.users).map((user, i) => (
            <User key={i} user={user} />
          ))}
      </table>
      {/* {JSON.stringify(users)} */}
    </div>
  );
}

export default Users;

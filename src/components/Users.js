import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUsers } from '../reducers/userReducer';
import { getAllUsers } from '../services/users';

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
      <p>users</p>
      {/* {JSON.stringify(users)} */}
      {users &&
        users.users &&
        Object.values(users.users).map((user, i) => (
          <div className='travelcompany-input' key={i}>
            <span className='input-label'>
              key: {i} Name: {user.username} {user.name}{' '}
              {JSON.stringify(user.blogs)}
            </span>
            <p>
              <span className='input-label'>{JSON.stringify(user)}</span>
            </p>
          </div>
        ))}
    </div>
  );
}

export default Users;

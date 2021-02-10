import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.users &&
            Object.values(users.users).map((user, i) => (
              <User key={i} user={user} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

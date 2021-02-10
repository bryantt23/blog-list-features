import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUsers } from '../reducers/userReducer';
import { getAllUsers } from '../services/users';

function UserInfo() {
  let { id } = useParams();
  //   const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);
  //   useEffect(() => {
  //     async function fetchMyAPI() {
  //       let response = await getAllUsers();
  //       dispatch(getUsers(response));
  //     }

  //     fetchMyAPI();
  //   }, [dispatch]);
  console.log(users);
  if (!users) {
    return (
      <div>
        This application needs to load users by having you click on{' '}
        <Link to='/users'>this</Link>
      </div>
    );
  }
  const user = users[id];

  console.log(id);
  console.log(users[id]);

  return (
    <div>
      UserInfo
      <h3>
        Username: {user.username} Name: {user.name}
      </h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => {
          return <li>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default UserInfo;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import getUsers from '../reducers/userReducer';
import { getAllUsers } from '../services/users';

function Users() {
  const dispatch = useDispatch();
  let users = useSelector(state => state.user);

  useEffect(() => {
    async function fetchMyAPI() {
      const baseUrl = 'http://localhost:3001/api/users/';
      const request = await fetch(baseUrl);
      const res = await request.json();
      console.log(res);
      dispatch({
        type: 'GET_USERS',
        payload: res
      });
      return res;
    }

    fetchMyAPI();
  }, [dispatch, users]);

  //   const [data, dataSet] = useState(null);

  //   useEffect(() => {
  //     async function fetchMyAPI() {
  //       const baseUrl = 'http://localhost:3001/api/users/';
  //       const request = await fetch(baseUrl);

  //       const res = await request.data;
  //       dataSet(res);
  //       return res;
  //     }
  //     const data = fetchMyAPI();
  //   let response = await getAllUsers();
  //   const data = await response.data;

  // console.log('data', data);
  // dispatch({
  //   type: 'GET_USERS',
  //   payload: data
  // });
  // }
  //   }, [dispatch]);

  //   async function fetchMyAPI() {
  //     const baseUrl = 'http://localhost:3001/api/users/';
  //     const request = await fetch(baseUrl);
  //     const res = await request.json();
  //     return res;
  //   }

  //   async function get() {
  //     const data = await fetchMyAPI();
  //     console.log('data   ', data);
  //   }

  //   get();

  console.log('users   ', users);
  //  {
  //    JSON.stringify(users);
  //  }
  return <div>users {JSON.stringify(users)}</div>;
}

const mapDispatchToProps = {
  getUsers
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const ConnectedUsers = connect(mapStateToProps, null)(Users);

export default ConnectedUsers;

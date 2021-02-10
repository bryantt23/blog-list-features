import React from 'react';
import { useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkIfUserLoggedIn } from '../reducers/userReducer';

function LoggedInInfo() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  //TODO: make it reflect in UI
  const handleLogout = () => {
    logout();
    dispatch(checkIfUserLoggedIn());
    return <Redirect to='/' />;
  };

  return (
    <span>
      {`Username ${user.username} is logged in `}
      <button onClick={handleLogout}>logout</button>
    </span>
  );
}

export default LoggedInInfo;

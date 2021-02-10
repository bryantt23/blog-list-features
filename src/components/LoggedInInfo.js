import React from 'react';
import { useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';

function LoggedInInfo() {
  const user = useSelector(state => state.user);

  //TODO: make it reflect in UI
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h3>
        {`Username ${user.username} is logged in `}
        <button onClick={handleLogout}>logout</button>
      </h3>
    </div>
  );
}

export default LoggedInInfo;

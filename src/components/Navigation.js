import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoggedInInfo from './LoggedInInfo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { checkIfUserLoggedIn, setUser, logout } from '../reducers/userReducer';
import { login } from '../services/users';

function Navigation() {
  const user = useSelector(state => state.user);
  console.log('user   ', user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIfUserLoggedIn());
  }, [dispatch]);

  console.log('user   ', user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //TODO: make it reflect in UI
  const handleLogin = async e => {
    e.preventDefault();
    const res = await login(username, password);
    if (res.error) {
      console.log(res.error);
    } else {
      const { name, username, token } = res;
      setUser({ name, username, token });
      dispatch(checkIfUserLoggedIn());
      return <Redirect to='/' />;
    }
  };

  let renderUi;
  if (!user.loggedIn) {
    renderUi = (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <input onChange={e => setUsername(e.target.value)} />
          <input onChange={e => setPassword(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  } else {
    renderUi = <LoggedInInfo />;
  }

  return (
    <div>
      <Link to={'/blogs'}>blogs</Link> <Link to={'/users'}>users</Link>{' '}
      {renderUi}
    </div>
  );
}

export default Navigation;

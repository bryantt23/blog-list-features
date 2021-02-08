import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import AddBlog from './components/AddBlog';
import userService from './services/users';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { checkIfUserLoggedIn, setUser, logout } from './reducers/userReducer';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(checkIfUserLoggedIn());
  }, [dispatch]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  // const [user, setUser] = useState(null);

  const hideWhenVisible = { display: formVisible ? 'none' : '' };
  const showWhenVisible = { display: formVisible ? '' : 'none' };

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     setUser(JSON.parse(localStorage.getItem('user')));
  //   }
  // }, []);

  const handleLogout = () => {
    logout();
  };

  const handleLogin = async e => {
    e.preventDefault();
    const res = await userService.login(username, password);
    if (res.error) {
      console.log(res.error);
    } else {
      const { name, username, token } = res;
      setUser({ name, username, token });
    }
  };

  console.log(props.user);
  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  if (!Object.entries(props.user).length) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <input onChange={e => setUsername(e.target.value)} />
          <input onChange={e => setPassword(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <h3>
        {`Username ${props.user.username} is logged in `}
        <button onClick={handleLogout}>logout</button>
      </h3>

      <BlogList />

      <div style={showWhenVisible}>
        <AddBlog />
        <button onClick={() => setFormVisible(false)}>
          cancel adding new note
        </button>
      </div>
      <div style={hideWhenVisible}>
        {' '}
        <button onClick={() => setFormVisible(true)}>add new note</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  logout,
  setUser
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;

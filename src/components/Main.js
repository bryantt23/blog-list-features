import React, { useState, useEffect } from 'react';
import userService from '../services/users';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';
import { checkIfUserLoggedIn, setUser, logout } from '../reducers/userReducer';
import { connect } from 'react-redux';
import BlogList from './BlogList';
import AddBlog from './AddBlog';

function Main(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(checkIfUserLoggedIn());
  }, [dispatch]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  // const [user, setUser] = useState(null);

  //TODO: make it reflect in UI
  const handleLogout = () => {
    logout();
  };

  //TODO: make it reflect in UI
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

  const hideWhenVisible = { display: formVisible ? 'none' : '' };
  const showWhenVisible = { display: formVisible ? '' : 'none' };

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     setUser(JSON.parse(localStorage.getItem('user')));
  //   }
  // }, []);

  console.log(props.user);
  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object

  // <Router>

  // </Router>
  return (
    <div>
      <h2>blogs</h2>
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
        <button onClick={() => setFormVisible(true)}>add new note</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  logout,
  setUser
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default ConnectedMain;

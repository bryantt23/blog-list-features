import React, { useState, useEffect } from 'react';
import { login } from '../services/users';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';
import { checkIfUserLoggedIn, setUser, logout } from '../reducers/userReducer';
import { connect } from 'react-redux';
import BlogList from './BlogList';
import AddBlog from './AddBlog';
import { useSelector } from 'react-redux';

function Main() {
  const user = useSelector(state => state.user);
  console.log('user   ', user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(checkIfUserLoggedIn());
  }, [dispatch]);

  console.log('user   ', user);
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
    const res = await login(username, password);
    if (res.error) {
      console.log(res.error);
    } else {
      const { name, username, token } = res;
      setUser({ name, username, token });
    }
  };

  if (!user.loggedIn) {
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

  console.log(user);
  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object

  // <Router>

  // </Router>
  return (
    <div>
      <h2>blogs</h2>
      <h3>
        {`Username ${user.username} is logged in `}
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

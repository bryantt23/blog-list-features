import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import AddBlog from './components/AddBlog';
import userService from './services/users';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const hideWhenVisible = { display: formVisible ? 'none' : '' };
  const showWhenVisible = { display: formVisible ? '' : 'none' };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    const res = await userService.login(username, password);
    if (res.error) {
      console.log(res.error);
    } else {
      const { name, username, token } = res;
      localStorage.setItem('user', JSON.stringify({ name, username, token }));
      setUser({ name, username, token });
    }
  };

  if (user === null) {
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

  function logout() {
    setUser(null);
    localStorage.clear();
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <h3>
        {`Username ${user.username} is logged in `}
        <button onClick={logout}>logout</button>
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

export default App;

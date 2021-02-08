import React, { useState } from 'react';
import blogService from '../services/blogs';
import { notificationAddBlog } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

function AddBlog(props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  //   https://github.com/bryantt23/phonebook/blob/master/src/PersonForm.js
  const [message, setMessage] = useState('');
  const [classStyle, setClassStyle] = useState('');
  const showTemporaryMessage = (message, style) => {
    setMessage(message);
    setClassStyle(style);

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await blogService.addBlog(title, author, url);
    console.log('res', res);
    if (res.error) {
      props.notificationAddBlog(res.error, 'error', 5);
      showTemporaryMessage(res.error, 'error');
    } else {
      //TODO maybe later make it render immediately, doesn't work now
      blogService.getAll();
      props.notificationAddBlog('Blog has been added', 'success', 5);
    }
  };

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Author:
          <input
            type='text'
            value={author}
            onChange={e => {
              setAuthor(e.target.value);
            }}
          />
        </label>
        <label>
          URL:
          <input
            type='text'
            value={url}
            onChange={e => {
              setUrl(e.target.value);
            }}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  notificationAddBlog
};

const ConnectedAddBlog = connect(null, mapDispatchToProps)(AddBlog);

export default ConnectedAddBlog;

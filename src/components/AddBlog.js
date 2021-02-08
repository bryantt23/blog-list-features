import React, { useState } from 'react';
import { addBlog, getAllBlogs } from '../services/blogs';
import { notificationAddBlog } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

function AddBlog(props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await addBlog(title, author, url);
    console.log('res', res);
    if (res.error) {
      props.notificationAddBlog(res.error, 'error', 5);
    } else {
      //TODO maybe later make it render immediately, doesn't work now
      getAllBlogs();
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

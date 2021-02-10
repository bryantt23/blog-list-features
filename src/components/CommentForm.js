import React, { useState } from 'react';
import { addComment } from '../services/blogs';
import { initializeBlogs } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

function CommentForm({ blogId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(comment);
    await addComment(blogId, comment);
    dispatch(initializeBlogs());
    return <Redirect to={'/blogs/${blogId}'} />;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <input type='submit' value='Submit' />
    </form>
  );
}

export default CommentForm;

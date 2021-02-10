import React, { useState } from 'react';
import { deleteBlog, addLike } from '../services/blogs';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';

const BlogInfo = () => {
  let { id } = useParams();
  const blogs = useSelector(state => state.blogs);
  console.log(blogs);
  const blog = blogs[id];

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(true);

  if (!expanded) {
    return (
      <div style={blogStyle}>
        Title: {blog.title}
        <button onClick={() => setExpanded(true)}>view</button>
      </div>
    );
  }

  let userName = getUserInfo().username;
  console.log('userName', userName);

  function getUserInfo() {
    return JSON.parse(localStorage.getItem('user'));
  }

  function checkIfUserBlog() {
    if (blog && blog.user && blog.user.username) {
      // console.log(blog.user._id);
      if (blog.user.username === userName) {
        console.log('match', blog);
        return true;
      }
    }
    return false;
  }

  const isUserBlog = checkIfUserBlog();

  async function deleteThisBlog(blogId) {
    if (window.confirm('Delete this blog?')) {
      console.log('delete this');
      await deleteBlog(blogId);
      dispatch(initializeBlogs());
    } else {
      console.log('do not delete this');
    }
  }

  async function likeThisBlog(blogId, likes) {
    await addLike(blogId, likes);
    dispatch(initializeBlogs());
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {JSON.stringify(blog)}
      <p> Title: {blog.title}</p>
      <p> Url: {blog.url}</p>
      <p>
        Likes: {blog.likes}
        <button
          onClick={() => {
            likeThisBlog(blog.id, blog.likes);
            console.log(blog.id);
          }}
        >
          like
        </button>
      </p>
      <p> Author: {blog.author}</p>
      <button onClick={() => setExpanded(false)}>hide</button>
      {isUserBlog && (
        <button
          onClick={() => {
            deleteThisBlog(blog.id);
            // console.log('delete this');
          }}
        >
          delete
        </button>
      )}
      <h3>comments</h3>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments.map(comment => {
          return <li>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogInfo;

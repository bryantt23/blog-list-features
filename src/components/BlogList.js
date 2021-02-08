import React from 'react';
// import { anecdoteVote } from '../reducers/anecdoteReducer';
// import { notificationAddVote } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import Blog from './Blog';

function BlogList(props) {
  //     const blogs = await getAllBlogs();
  let blogsArr = Object.entries(props.blogs).map(obj => obj[1]);
  blogsArr.sort((a, b) => b.likes - a.likes);
  // setBlogs(blogsArr);

  return (
    <div>
      {blogsArr.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);

export default ConnectedBlogList;

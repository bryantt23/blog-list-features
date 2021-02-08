import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog';

function BlogList(props) {
  let blogsArr = Object.entries(props.blogs).map(obj => obj[1]);
  blogsArr.sort((a, b) => b.likes - a.likes);

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

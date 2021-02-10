import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs/';
// import blogService from './services/blogs';

export const getAllBlogs = async () => {
  const request = await axios.get(baseUrl);
  const data = await request.data;
  return data;
};

function getAuthorizationInfo() {
  return JSON.parse(localStorage.getItem('user')).token;
}

// https://stackoverflow.com/questions/50403231/request-api-node-js-using-bearer-token/50405905
export const addBlog = async (title, author, url) => {
  const authorizationInfo = getAuthorizationInfo();
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorizationInfo}`
    },
    body: JSON.stringify({ title, author, url })
  };
  const response = await fetch(baseUrl, requestOptions);
  const data = await response.json();

  return data;
};

// https://stackoverflow.com/questions/21393706/node-js-put-with-request-module
export const addLike = async (id, likes) => {
  console.log(likes, 'likes');
  const likesData = JSON.stringify({ likes: likes + 1 });
  console.log(id, 'id');
  console.log(likes, 'likes');
  const authorizationInfo = getAuthorizationInfo();
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorizationInfo}`
    },
    body: likesData
  };
  const response = await fetch(baseUrl + id, requestOptions);
  const data = await response.json();

  return data;
};

export const deleteBlog = async id => {
  console.log(id, 'id');
  const authorizationInfo = getAuthorizationInfo();
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorizationInfo}`
    }
  };
  const response = await fetch(baseUrl + id, requestOptions);
  const data = await response.json();

  return data;
};

export const addComment = async (blogId, comment) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  };
  debugger;
  const url = `${baseUrl}/${blogId}/comments`;
  console.log(url);
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return data;
};

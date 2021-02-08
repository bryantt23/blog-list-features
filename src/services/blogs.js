import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs/';
// import blogService from './services/blogs';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const data = await request.data;
  return data;
};

function getAuthorizationInfo() {
  return JSON.parse(localStorage.getItem('user')).token;
}

// https://stackoverflow.com/questions/50403231/request-api-node-js-using-bearer-token/50405905
const addBlog = async (title, author, url) => {
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
const addLike = async (id, likes) => {
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

const deleteBlog = async id => {
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

export default { getAll, addBlog, addLike, deleteBlog };

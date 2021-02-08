import axios from 'axios';

//https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
export const login = async (username, password) => {
  const baseUrl = 'http://localhost:3001/api/login';
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  const data = await fetch(baseUrl, requestOptions);
  const res = await data.json();

  return res;
};

export const getAllUsers = async () => {
  const baseUrl = 'http://localhost:3001/api/users/';
  const request = await axios.get(baseUrl);
  const data = await request.data;
  return data;
};

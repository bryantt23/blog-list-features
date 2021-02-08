const baseUrl = 'http://localhost:3001/api/login';
//https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
const login = async (username, password) => {
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

export default { login };

import { getAllUsers } from '../services/users';

const initialState = {};

export const checkIfUserLoggedIn = () => {
  return async dispatch => {
    if (localStorage.getItem('user')) {
      dispatch({
        type: 'SET_USER',
        payload: JSON.parse(localStorage.getItem('user'))
      });
    } else {
      logout();
    }
  };
};

export const setUser = ({ name, username, token }) => {
  localStorage.setItem('user', JSON.stringify({ name, username, token }));
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      payload: { name, username, token }
    });
  };
};

export const logout = () => {
  // debugger;
  localStorage.clear();
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    });
  };
};

export const getUsers = users => {
  return async dispatch => {
    dispatch({
      type: 'GET_USERS',
      payload: users
    });
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return { ...state, user: null, loggedIn: false };
    case 'GET_USERS':
      const users = action.payload;
      console.log('users', users);
      return { ...state, users };
    case 'SET_USER':
      const { user, username, token } = action.payload;
      return { ...state, user, username, token, loggedIn: true };
    default:
      return state;
  }
};

export default userReducer;

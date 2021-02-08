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
  localStorage.clear();
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    });
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_USER':
      const { user, username, token } = action.payload;
      return { ...state, user, username, token };
    default:
      return state;
  }
};

export default userReducer;

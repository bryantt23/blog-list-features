const initialState = { show: false, message: '' };

// https://stackoverflow.com/questions/38734702/javascript-handle-multiple-instances-of-settimeout
let timeoutId;
export const notificationAddBlog = (message, classStyle, timeout) => {
  // console.log('notificationAddBlog', content);
  // debugger;
  return async dispatch => {
    dispatch({
      type: 'ADD_BLOG_NOTIFICATION',
      payload: { message, classStyle }
    });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
    timeoutId = setTimeout(() => {
      dispatch(notificationHide());
    }, timeout * 1000);
  };
};

// export const notificationAddNote = (content, timeout) => {
//   return async dispatch => {
//     dispatch({
//       type: 'ADD_NOTE_NOTIFICATION',
//       payload: content
//     });
//     // https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
//     setTimeout(() => {
//       dispatch(notificationHide());
//     }, timeout * 1000);
//   };
// };

export const notificationHide = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  };
};

const notificationReducer = (state = initialState, action) => {
  // let content, message;

  switch (action.type) {
    // case 'ADD_VOTE_NOTIFICATION':
    //   content = action.payload;
    //   message = `You voted for note: ${content}`;
    //   return { ...state, show: true, message };
    case 'ADD_BLOG_NOTIFICATION':
      const { message, classStyle } = action.payload;
      // message = `You created note: ${content}`;
      return { ...state, show: true, message, classStyle };
    // return { ...state, show: true, message };
    case 'HIDE_NOTIFICATION':
      return { ...state, message: '', show: false };
    default:
      return state;
  }
};

export default notificationReducer;

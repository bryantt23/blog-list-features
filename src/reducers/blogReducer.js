import { getAllBlogs } from '../services/blogs';
const initialState = [];

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await getAllBlogs();
    console.log(blogs);
    dispatch({
      type: 'BLOGS_INIT',
      payload: blogs
    });
  };
};

// export const anecdoteVote = anecdote => {
//   return async dispatch => {
//     await voteAnecdote(anecdote);
//     dispatch({
//       type: 'VOTE',
//       payload: anecdote.id
//     });
//   };
// };

// export const addNote = anecdote => {
//   return async dispatch => {
//     await addAnecdote(anecdote);
//     dispatch({
//       type: 'ADD_NOTE',
//       payload: anecdote
//     });
//   };
// };

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'VOTE':
    //   const id = action.payload;
    //   let index = state.findIndex(elem => elem.id === id);
    //   let stateCopy = [...state];
    //   stateCopy[index].votes++;
    //   return stateCopy;
    // case 'ADD_NOTE':
    //   const anecdote = action.payload;
    //   const updatedState = state.concat(anecdote);
    //   return updatedState;
    case 'BLOGS_INIT':
      const blogs = action.payload;
      return blogs;
    default:
      return state;
  }
};

export default blogReducer;

import React from 'react';
// import './Notification.css';

const styleMap = {
  success: {
    backgroundColor: 'green'
  },
  error: {
    backgroundColor: 'red'
  }
};

function Notification({ message, classStyle }) {
  console.log('classStyle', classStyle);
  if (message === null) {
    return null;
  }

  return <div style={styleMap[classStyle]}>{message}</div>;
}

export default Notification;

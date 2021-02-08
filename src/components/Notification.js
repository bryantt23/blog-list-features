import React from 'react';
// import './Notification.css';
import { useSelector } from 'react-redux';

const styleMap = {
  success: {
    backgroundColor: 'green'
  },
  error: {
    backgroundColor: 'red'
  }
};

function Notification({ message, classStyle }) {
  console.log('NNotification', message);
  const notification = useSelector(state => state.notification);
  // debugger;
  console.log('classStyle', classStyle);
  console.log('notification', notification);
  if (notification.message === null) {
    return null;
  }

  return (
    <div style={styleMap[notification.classStyle]}>{notification.message}</div>
  );
}

export default Notification;

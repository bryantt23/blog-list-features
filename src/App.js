import React from 'react';
import Main from './components/Main';
import Notification from './components/Notification';

const App = props => {
  return (
    <div>
      <Notification />
      <Main />
    </div>
  );
};

export default App;

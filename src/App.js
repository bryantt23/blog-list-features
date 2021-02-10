import React from 'react';
import Main from './components/Main';
import Notification from './components/Notification';
import Users from './components/Users';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserInfo from './components/UserInfo';

const App = props => {
  return (
    <Router>
      <div>
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <UserInfo />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

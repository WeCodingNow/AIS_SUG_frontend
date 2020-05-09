import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Landing from './views/Landing';
import Students from './views/Students';
import Cabinet from './views/Cabinet';
import Groups from './views/Groups';
import University from './views/University';
import Debug from './views/Debug';
import Header from './components/Header';
import { useSelector } from './store/store';
import './App.css';
import Registration from './views/Register';
import { LOGGED_IN } from './store/auth/types';

const App: React.FC = () => {
  const isLogin = useSelector((state) => state.auth.loggedIn);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={() => (isLogin === LOGGED_IN ? <Redirect to="/cabinet" /> : <Landing />)} />
        <Route
          exact
          path="/register"
          component={() => (isLogin === LOGGED_IN ? <Redirect to="/cabinet" /> : <Registration />)}
        />
        <Route exact path="/cabinet" component={() => (isLogin === LOGGED_IN ? <Cabinet /> : <Redirect to="/" />)} />
        <Route exact path="/groups" component={() => (isLogin === LOGGED_IN ? <Groups /> : <Redirect to="/" />)} />
        <Route exact path="/students" component={() => (isLogin === LOGGED_IN ? <Students /> : <Redirect to="/" />)} />
        <Route
          exact
          path="/university"
          component={() => (isLogin === LOGGED_IN ? <University /> : <Redirect to="/" />)}
        />
        <Route exact path="/debug" component={Debug} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

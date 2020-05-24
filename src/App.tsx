import React, { useEffect } from 'react';
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

import AisAPI from './services/ais';

import auth from './store/auth/actions';
import roleActions from './store/role/actions';

import * as debug from './debug';
import { studentID } from './roles';

const App: React.FC = () => {
  const isLogin = useSelector((state) => state.auth.loggedIn);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      AisAPI.setToken(token);
      roleActions.fill();
      auth.tokenSetSuccess();
    }
  }, [token]);

  const role = useSelector((st) => st.role.role);

  return (
    <Router>
      <Header />
      <Switch>
        {debug.enabled ? <Route exact path="/debug" component={Debug} /> : <></>}
        <Route exact path="/" component={() => (isLogin === LOGGED_IN ? <Redirect to="/cabinet" /> : <Landing />)} />
        <Route
          exact
          path="/register"
          component={() => (isLogin === LOGGED_IN ? <Redirect to="/cabinet" /> : <Registration />)}
        />
        <Route exact path="/cabinet" component={() => (isLogin === LOGGED_IN ? <Cabinet /> : <Redirect to="/" />)} />
        <Route
          exact
          path="/groups"
          component={() => (isLogin === LOGGED_IN && role?.id !== studentID ? <Groups /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/students"
          component={() => (isLogin === LOGGED_IN && role?.id !== studentID ? <Students /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/university"
          component={() => (isLogin === LOGGED_IN ? <University /> : <Redirect to="/" />)}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

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

const App: React.FC = () => {
  const isLogin = useSelector((state) => state.auth.loggedIn);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={() => (isLogin ? <Redirect to="/cabinet" /> : <Landing />)} />
        <Route exact path="/register" component={() => (isLogin ? <Redirect to="/cabinet" /> : <Registration />)} />
        <Route exact path="/cabinet" component={() => (isLogin ? <Cabinet /> : <Redirect to="/" />)} />
        <Route exact path="/groups" component={() => (isLogin ? <Groups /> : <Redirect to="/" />)} />
        <Route exact path="/students" component={() => (isLogin ? <Students /> : <Redirect to="/" />)} />
        <Route exact path="/university" component={() => (isLogin ? <University /> : <Redirect to="/" />)} />
        <Route exact path="/debug" component={Debug} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

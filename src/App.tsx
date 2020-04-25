import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Landing from './views/Landing';
import Students from './views/Students';
import Cabinet from './views/Cabinet';
import Groups from './views/Groups';
import University from './views/University';
import Header from './components/Header';
import { useSelector } from './store/store';
import './App.css';

const App: React.FC = () => {
  const isLogin = useSelector((state) => state.auth.loggedIn);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          {/* restricted routes */}
          {isLogin ? (
            <>
              <Redirect exact from="/" to="/cabinet" />
            </>
          ) : (
            <Route path="/" exact component={Landing} />
          )}

          {/* private routes */}
          {isLogin ? (
            <>
              <Route exact path="/cabinet" component={Cabinet} />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/students" component={Students} />
              <Route exact path="/university" component={University} />
            </>
          ) : (
            <Redirect to="/" />
          )}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default App;

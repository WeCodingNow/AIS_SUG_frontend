import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Landing from './views/Landing';
import Students from './views/Students';
import Cabinet from './views/Cabinet';
import Groups from './views/Groups';
import University from './views/University';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/cabinet" component={Cabinet} />
        <Route path="/students" component={Students} />
        <Route path="/groups" component={Groups} />
        <Route path="/university" component={University} />
        <Redirect from="*" exact to="/" />
      </Switch>
    </Router>
  );
};

export default App;

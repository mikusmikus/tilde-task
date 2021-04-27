import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Task1 from './pages/Task1';
import Task2 from './pages/Task2';
import Task3 from './pages/Task3';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/task-2">
          <Task2 />
        </Route>
        <Route path="/task-3">
          <Task3 />
        </Route>
        <Route path="/">
          <Task1 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

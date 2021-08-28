import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PeopleList } from '../entities/people/pages/people-list';
import { PeopleDetails } from '../entities/people/pages/people-details';

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PeopleList />
        </Route>
        <Route exact path="/people/:personId">
          <PeopleDetails />
        </Route>
      </Switch>
    </Router>
  );
};

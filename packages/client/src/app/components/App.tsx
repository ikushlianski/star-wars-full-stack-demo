import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../../routes/routes';

export const App = (): ReactElement => {
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../../routes/routes';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

export const App = (): ReactElement => {
  return (
    <Container className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Star Wars People</Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Routes />
      </Router>
    </Container>
  );
};

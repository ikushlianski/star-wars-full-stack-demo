import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPerson } from '../store/action';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getLoadingState, getPeopleChunk } from '../store/selectors';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import './person-details.css';

export const PeopleDetails = () => {
  const dispatch = useDispatch();
  const {
    params: { personId },
  } = useRouteMatch<{ personId: string }>();
  const history = useHistory();

  const loading = useSelector(getLoadingState);
  const [person] = useSelector(getPeopleChunk);

  useEffect(() => {
    dispatch(fetchPerson(personId));
  }, [dispatch, personId]);

  return loading ? (
    <CircularProgress className="PersonDetails__Progress" />
  ) : (
    <Card elevation={1}>
      <CardContent className="PersonDetails">
        {person ? (
          <>
            <Typography variant="h2">{person.name}</Typography>
            <Typography>Birth year: {person.birth_year}</Typography>
            <Typography>Mass: {person.mass}</Typography>
            <Typography>Height: {person.height}</Typography>
            <Typography>Species: {person.species || 'unknown'}</Typography>
          </>
        ) : (
          <Typography>No person details found</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={history.goBack} size="small">
          Go back
        </Button>
      </CardActions>
    </Card>
  );
};

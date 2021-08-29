import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPerson } from '../store/action';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getPeopleChunk } from '../store/selectors';

export const PeopleDetails = () => {
  const dispatch = useDispatch();
  const {
    params: { personId },
  } = useRouteMatch<{ personId: string }>();
  const history = useHistory();

  const [person] = useSelector(getPeopleChunk);

  useEffect(() => {
    dispatch(fetchPerson(personId));
  }, [dispatch, personId]);

  return (
    <>
      {person ? (
        <div className="PersonDetails">
          <h1>{person.name}</h1>
          <div>Birth year: {person.birth_year}</div>
          <div>Mass: {person.mass}</div>
          <div>Height: {person.height}</div>
          {/*<div>Species: ${species }</div>*/}
        </div>
      ) : (
        'No person details found'
      )}

      <hr />
      <button onClick={() => history.goBack()}>Go back</button>
    </>
  );
};

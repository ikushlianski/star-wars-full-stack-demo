import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPeople } from '../store/action';
import { useLocation } from 'react-router-dom';

export const PeopleList = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();

  console.log('search', search);

  useEffect(() => {
    // dispatch(fetchPeople())
  }, []);

  return <div>People list page</div>;
};

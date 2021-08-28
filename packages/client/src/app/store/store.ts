import { configureStore } from '@reduxjs/toolkit';
import { peopleReducer } from '../../entities/people/store/reducer';
import { speciesReducer } from '../../entities/species/store/reducer';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    // species: speciesReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import { peopleReducer } from '../../entities/people/store/reducer';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    // species: speciesReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

import { createSlice } from '@reduxjs/toolkit';
import { fetchPeople } from './action';
import { Person } from '../../../contracts/person';
import { listToMap } from '../dal/list-to-map';
import { PersonById } from '../../../contracts/person-by-id';

export interface PeopleState {
  raw: Person[];
  list: PersonById;
  loading: boolean;
  loaded: boolean;
  error?: Error;
}

export interface PersonState {
  person?: Person;
  loading: boolean;
  loaded: boolean;
  error?: Error;
}

const initialState: PeopleState = {
  raw: [],
  list: {},
  loading: false,
  loaded: false,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loaded = false;
        state.loading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, { payload }) => {
        state.raw = payload.raw;
        state.list = listToMap(payload.raw);
        state.loaded = payload.loaded;
        state.loading = payload.loading;
        state.error = payload.error;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.raw = [];
        state.list = {};
        state.loaded = true;
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const peopleReducer = peopleSlice.reducer;

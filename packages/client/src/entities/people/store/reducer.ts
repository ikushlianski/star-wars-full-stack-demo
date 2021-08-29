import { createSlice } from '@reduxjs/toolkit';
import { fetchPeople, fetchPeopleTotalCount, fetchPerson } from './action';
import { Person } from '../../../contracts/person';
import { listToMap } from '../dal/list-to-map';
import { PersonById } from '../../../contracts/person-by-id';

export interface PeopleState {
  totalCount?: number;
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
  totalCount: undefined,
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
        state.loaded = true;
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.raw = [];
        state.list = {};
        state.loaded = true;
        state.loading = false;
        state.error = action.payload?.error;
      })

      .addCase(fetchPerson.pending, (state) => {
        state.loaded = false;
        state.loading = true;
      })
      .addCase(fetchPerson.fulfilled, (state, { payload }) => {
        if (payload.person) {
          state.raw = [payload.person];

          state.list = {
            [payload.person.id]: payload.person,
          };
        }

        state.loaded = true;
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(fetchPerson.rejected, (state, action) => {
        state.loaded = true;
        state.loading = false;
        state.error = action.payload?.error;
      })

      .addCase(fetchPeopleTotalCount.pending, (state) => {
        state.loaded = false;
        state.loading = true;
      })
      .addCase(fetchPeopleTotalCount.fulfilled, (state, { payload }) => {
        state.totalCount = payload.totalCount;
        state.loaded = true;
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(fetchPeopleTotalCount.rejected, (state, action) => {
        state.loaded = true;
        state.loading = false;
        state.error = action.payload?.error;
        state.totalCount = undefined;
      });
  },
});

export const peopleReducer = peopleSlice.reducer;

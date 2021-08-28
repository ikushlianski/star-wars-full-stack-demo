import { createSlice } from '@reduxjs/toolkit';
import { fetchSpecies } from './action';
import { Person } from '../../../contracts/person';

export interface SpeciesState {
  list: Person[];
  loading: boolean;
  loaded: boolean;
  error?: Error;
}

const initialState: SpeciesState = {
  list: [],
  loading: false,
  loaded: false,
};

export const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecies.pending, (state) => {
        state.loaded = false;
        state.loading = true;
      })
      .addCase(fetchSpecies.fulfilled, (state, { payload }) => {
        state.list = payload.list;
        state.loaded = payload.loaded;
        state.loading = payload.loading;
        state.error = payload.error;
      })
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.list = [];
        state.loaded = true;
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const speciesReducer = speciesSlice.reducer;

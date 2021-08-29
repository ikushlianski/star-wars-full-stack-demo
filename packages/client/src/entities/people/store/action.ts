import { createAsyncThunk } from '@reduxjs/toolkit';

import { PeopleState, PersonState } from './reducer';
import { peopleApiService } from '../../../http-client/services/people-api.service';
import { PeopleReqQueryParams } from '../../../contracts/people-req-query-params';

export const fetchPeople = createAsyncThunk<
  PeopleState,
  PeopleReqQueryParams,
  {
    rejectValue: PeopleState;
  }
>('people/getList', async (reqQueryParams, { rejectWithValue }) => {
  try {
    return await peopleApiService.getList(reqQueryParams);
  } catch (error) {
    return rejectWithValue({
      loaded: true,
      loading: false,
      error: error.message || 'Failed to get people list',
      raw: [],
      list: {},
    });
  }
});

export const fetchPerson = createAsyncThunk<
  PersonState,
  string,
  {
    rejectValue: PersonState;
  }
>('people/getPerson', async (personId, { rejectWithValue }) => {
  try {
    return await peopleApiService.getPerson(personId);
  } catch (error) {
    return rejectWithValue({
      loaded: true,
      loading: false,
      error: error.message || `Failed to get person with id ${personId}`,
      person: undefined,
    });
  }
});

export const fetchPeopleTotalCount = createAsyncThunk<
  PeopleState,
  undefined,
  {
    rejectValue: PeopleState;
  }
>('people/getCount', async (payload, { rejectWithValue }) => {
  try {
    return await peopleApiService.getTotalCount();
  } catch (error) {
    return rejectWithValue({
      loaded: true,
      loading: false,
      error: error.message || 'Failed to get people count',
      raw: [],
      list: {},
    });
  }
});

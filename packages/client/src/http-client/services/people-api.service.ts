import { client } from '../http-client';
import { PeopleState, PersonState } from '../../entities/people/store/reducer';
import { Person } from '../../contracts/person';
import { PeopleReqQueryParams } from '../../contracts/people-req-query-params';

export const peopleApiService = {
  getList: async function ({
    sortBy,
    sortDir,
    offset,
    limit,
  }: PeopleReqQueryParams): Promise<PeopleState> {
    try {
      const searchParams = new URLSearchParams({
        sortBy,
        sortDir,
        offset: String(offset),
        limit: String(limit),
      }).toString();

      const url = `/people?${searchParams}`;
      const result = await client<Person[]>({
        url,
        method: 'GET',
      });

      return {
        loaded: true,
        loading: false,
        error: undefined,
        raw: result.data,
        list: {},
      };
    } catch (e) {
      return {
        loaded: true,
        loading: false,
        error: new Error('Could not fetch people'),
        raw: [],
        list: {},
      };
    }
  },

  getPerson: async function (id: string): Promise<PersonState> {
    try {
      const url = `/people/${id}`;
      const result = await client<Person[]>({
        url,
        method: 'GET',
      });

      return {
        loaded: true,
        loading: false,
        error: undefined,
        person: result.data[0],
      };
    } catch (e) {
      return {
        loaded: true,
        loading: false,
        error: new Error('Could not fetch person'),
        person: undefined,
      };
    }
  },

  getTotalCount: async function (): Promise<PeopleState> {
    try {
      const url = `/people/count`;
      const result = await client<number>({
        url,
        method: 'GET',
      });

      return {
        loaded: true,
        loading: false,
        error: undefined,
        totalCount: result.data,
        raw: [],
        list: {},
      };
    } catch (e) {
      return {
        loaded: true,
        loading: false,
        error: new Error('Could not fetch persons count'),
        list: {},
        raw: [],
        totalCount: undefined,
      };
    }
  },
};

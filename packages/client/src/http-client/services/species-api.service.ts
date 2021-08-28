import { client } from '../http-client';
import { PeopleState } from '../../entities/people/store/reducer';
import { RawPerson } from '../../contracts/person';
import { PeopleReqQueryParams } from '../../contracts/people-req-query-params';

export const speciesApiService = {
  getMine: async function ({
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
      const result = await client<RawPerson[]>({
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
        error: new Error('Could not fetch iterations'),
        raw: [],
        list: {},
      };
    }
  },
};

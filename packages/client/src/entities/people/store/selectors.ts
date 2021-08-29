import { ApplicationState } from '../../../app/store/store';
import { Person } from '../../../contracts/person';

export const getPeopleChunk = (state: ApplicationState): Person[] => {
  return state.people.raw;
};

export const getPeopleCount = (state: ApplicationState): number => {
  return state.people.totalCount || 0;
};

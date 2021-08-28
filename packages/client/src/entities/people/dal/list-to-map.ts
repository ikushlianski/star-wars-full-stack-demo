import { Person } from '../../../contracts/person';
import { PersonById } from '../../../contracts/person-by-id';

export const listToMap = (personsList: Person[]): PersonById => {
  return personsList.reduce((acc: PersonById, cur) => {
    acc[cur.id] = cur;

    return acc;
  }, {});
};

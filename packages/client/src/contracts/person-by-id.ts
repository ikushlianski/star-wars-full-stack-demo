import { Person } from './person';

export interface PersonById {
  [key: string]: Person;
}

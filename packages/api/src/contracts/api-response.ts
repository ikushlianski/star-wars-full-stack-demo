import { RawPerson } from './person';

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawPerson[];
}

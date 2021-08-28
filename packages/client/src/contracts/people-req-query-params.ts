import { SortBy } from './sort-by';
import { SortDir } from './sort-dir';

export interface PeopleReqQueryParams {
  sortBy: SortBy;
  sortDir: SortDir;
  offset: number;
  limit: number;
}

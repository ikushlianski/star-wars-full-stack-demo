import { SortDir } from '../contracts/sort-dir';

export function invertSorting(sortDir: SortDir) {
  return sortDir === SortDir.ASC ? SortDir.DESC : SortDir.ASC;
}

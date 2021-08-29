import React from 'react';
import { SortDir } from '../../../contracts/sort-dir';
import { SortBy } from '../../../contracts/sort-by';

interface Props {
  id: SortBy;
  sortingIsBy: SortBy;
  sortDir: SortDir;
}

export const SortIndicator: React.FC<Props> = ({
  id,
  sortingIsBy,
  sortDir,
}) => {
  return id === sortingIsBy ? (
    <span className="SortIndicator">{sortDir === SortDir.ASC ? '▼' : '▲'}</span>
  ) : null;
};

import { Link } from 'react-router-dom';
import React from 'react';
import { SortIndicator } from './sort-indicator';
import { SortBy } from '../../../contracts/sort-by';
import { Person } from '../../../contracts/person';
import { SortDir } from '../../../contracts/sort-dir';
import { invertSorting } from '../../../helpers/invert-sorting';

interface Props {
  peopleForPage: Person[];
  sortDir: SortDir;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  setSortDir: (sortDir: SortDir) => void;
}

export const Table: React.FC<Props> = ({
  peopleForPage,
  sortDir,
  sortBy,
  setSortDir,
  setSortBy,
}) => {
  const handleClick = (currentCol: SortBy) => () => {
    if (sortBy === currentCol) {
      return setSortDir(invertSorting(sortDir));
    }

    return setSortBy(currentCol);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={handleClick(SortBy.Name)}>
            Name
            <SortIndicator
              id={SortBy.Name}
              sortingIsBy={sortBy}
              sortDir={sortDir}
            />
          </th>
          <th onClick={handleClick(SortBy.Age)}>
            Age
            <SortIndicator
              id={SortBy.Age}
              sortingIsBy={sortBy}
              sortDir={sortDir}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {peopleForPage.map((person: Person) => {
          return (
            <tr key={person.name}>
              <td>
                <Link to={`/people/${person.id}`}>{person.name}</Link>
              </td>
              <td>{person.birth_year}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

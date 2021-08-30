import { Link } from 'react-router-dom';
import React from 'react';
import { SortIndicator } from './sort-indicator';
import { SortBy } from '../../../contracts/sort-by';
import { Person } from '../../../contracts/person';
import { SortDir } from '../../../contracts/sort-dir';
import { invertSorting } from '../../../helpers/invert-sorting';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import './table.css';

interface Props {
  peopleForPage: Person[];
  sortDir: SortDir;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  setSortDir: (sortDir: SortDir) => void;
}

export const TableComponent: React.FC<Props> = ({
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
    <Table
      style={{ tableLayout: 'fixed' }}
      size="small"
      className="PeopleTable"
    >
      <TableHead>
        <TableRow>
          <TableCell
            className="PeopleTable__HeaderCell"
            onClick={handleClick(SortBy.Name)}
          >
            Name
            <SortIndicator
              id={SortBy.Name}
              sortingIsBy={sortBy}
              sortDir={sortDir}
            />
          </TableCell>
          <TableCell
            className="PeopleTable__HeaderCell"
            onClick={handleClick(SortBy.Age)}
          >
            Age
            <SortIndicator
              id={SortBy.Age}
              sortingIsBy={sortBy}
              sortDir={sortDir}
            />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {peopleForPage.map((person: Person) => (
          <TableRow key={person.name}>
            <TableCell>
              <Link to={`/people/${person.id}`}>{person.name}</Link>
            </TableCell>
            <TableCell>{person.birth_year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

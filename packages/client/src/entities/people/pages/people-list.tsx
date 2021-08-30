import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPeopleChunk, getPeopleCount } from '../store/selectors';
import { PaginationComponent } from '../components/pagination';
import { fetchPeople, fetchPeopleTotalCount } from '../store/action';
import { SortBy } from '../../../contracts/sort-by';
import { SortDir } from '../../../contracts/sort-dir';
import { TableComponent } from '../components/table';
import { Paper, TableContainer } from '@material-ui/core';

export const PeopleList = () => {
  const limit = 10;
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(SortBy.Age);
  const [sortDir, setSortDir] = useState(SortDir.DESC);
  const offset = page * limit;

  const dispatch = useDispatch();
  const peopleCount = useSelector(getPeopleCount);
  const peopleForPage = useSelector(getPeopleChunk);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSetSortBy = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setSortDir(SortDir.ASC);
    setPage(0);
  };

  const handleSetSortDir = (newSortDir: SortDir) => {
    setSortDir(newSortDir);
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      fetchPeople({
        sortBy,
        sortDir,
        offset,
        limit,
      }),
    );

    dispatch(fetchPeopleTotalCount());
  }, [dispatch, offset, page, sortBy, sortDir]);

  return (
    <div>
      <TableContainer component={Paper}>
        <TableComponent
          peopleForPage={peopleForPage}
          sortDir={sortDir}
          sortBy={sortBy}
          setSortBy={handleSetSortBy}
          setSortDir={handleSetSortDir}
        />
      </TableContainer>

      {peopleCount !== undefined && (
        <PaginationComponent
          page={page}
          limit={limit}
          onChange={onPageChange}
          totalItems={peopleCount}
        />
      )}
    </div>
  );
};

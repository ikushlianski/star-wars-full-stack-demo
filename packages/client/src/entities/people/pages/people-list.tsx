import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TableContainer } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { getPeopleChunk, getPeopleCount } from '../store/selectors';
import { PaginationComponent } from '../components/pagination';
import { fetchPeople, fetchPeopleTotalCount } from '../store/action';
import { TableComponent } from '../components/table';
import { SortBy } from '../../../contracts/sort-by';
import { SortDir } from '../../../contracts/sort-dir';
import { getQueryVariable } from '../../../helpers/querystring';

export const PeopleList: React.FC = () => {
  const limit = 10;
  const [page, setPage] = useState(0);
  const [sortDir, setSortDir] = useState<SortDir>(SortDir.DESC);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Age);

  const history = useHistory();
  const dispatch = useDispatch();
  const peopleCount = useSelector(getPeopleCount);
  const peopleForPage = useSelector(getPeopleChunk);

  const onPageChange = (newPage: number) => {
    const param = new URLSearchParams();

    param.set('page', newPage.toString());
    param.set('sortBy', sortBy);
    param.set('sortDir', sortDir);
    param.set('limit', limit.toString());

    localStorage.setItem('SearchQuery', param.toString());

    history.push({ search: param.toString() });

    setPage(newPage);
  };

  const handleSetSortBy = (newSortBy: SortBy) => {
    const param = new URLSearchParams();

    param.set('page', '0');
    param.set('sortBy', newSortBy);
    param.set('sortDir', sortDir);
    param.set('limit', limit.toString());

    setSortBy(newSortBy);
    setSortDir(SortDir.ASC);
    setPage(0);

    localStorage.setItem('SearchQuery', param.toString());

    history.push({ search: param.toString() });
  };

  const handleSetSortDir = (newSortDir: SortDir) => {
    const param = new URLSearchParams();

    param.set('page', '0');
    param.set('sortBy', sortBy);
    param.set('sortDir', newSortDir);
    param.set('limit', limit.toString());

    setSortDir(newSortDir);
    setPage(0);

    localStorage.setItem('SearchQuery', param.toString());

    history.push({ search: param.toString() });
  };

  useEffect(() => {
    const qs = localStorage.getItem('SearchQuery');

    const param = new URLSearchParams();

    if (!qs) {
      param.set('page', '0');
      param.set('sortBy', SortBy.Age);
      param.set('sortDir', SortDir.DESC);
      param.set('limit', limit.toString());

      const newQs = param.toString();

      history.push({ search: newQs });

      localStorage.setItem('SearchQuery', newQs);
    } else {
      setPage(Number(getQueryVariable('page')));
      setSortDir(getQueryVariable('sortDir') as SortDir);
      setSortBy(getQueryVariable('sortBy') as SortBy);

      history.push({ search: qs });
    }
  }, [history]);

  useEffect(() => {
    dispatch(
      fetchPeople({
        sortBy,
        sortDir,
        offset: page * limit,
        limit,
      }),
    );

    dispatch(fetchPeopleTotalCount());
  }, [dispatch, page, sortBy, sortDir]);

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

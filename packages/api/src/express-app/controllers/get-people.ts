import { NextFunction, Request, Response } from 'express';
import { SortBy } from '../enums/sort-by';
import { SortDir } from '../enums/sort-dir';
import { peopleService } from '../services/people-service';

export const getPeopleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> => {
  const PEOPLE_BY_PAGE = 10;

  const {
    sortBy = SortBy.Name,
    sortDir = SortDir.ASC,
    limit = PEOPLE_BY_PAGE,
    offset = 0,
  } = req.query;

  console.log('sortBy', sortBy);
  console.log('sortDir', sortDir);
  console.log('limit', limit);
  console.log('offset', offset);

  const result = await peopleService.get(
    sortBy as SortBy,
    sortDir as SortDir,
    Number(offset),
    limit as number,
  );

  return res.send(result);
};

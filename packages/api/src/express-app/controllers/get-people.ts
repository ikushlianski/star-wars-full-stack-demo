import { Request, Response } from 'express';
import { SortBy } from '../enums/sort-by';
import { SortDir } from '../enums/sort-dir';
import { peopleService } from '../services/people-service';

export const getPeopleController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const {
    sortBy = SortBy.Name,
    sortDir = SortDir.ASC,
    limit,
    offset = 0,
  } = req.query;

  const result = await peopleService.getPersonsList(
    sortBy as SortBy,
    sortDir as SortDir,
    Number(offset),
    Number(limit),
  );

  return res.send(result);
};

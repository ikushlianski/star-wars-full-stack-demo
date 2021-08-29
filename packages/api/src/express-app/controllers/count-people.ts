import { Request, Response } from 'express';
import { peopleService } from '../services/people-service';

export const countPeopleController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const totalCount = await peopleService.getPersonsCount();

    return res.status(200).json(totalCount);
  } catch (e) {
    console.error(e);

    return res.status(500);
  }
};

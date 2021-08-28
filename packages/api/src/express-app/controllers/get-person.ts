import { Request, Response } from 'express';
import { peopleService } from '../services/people-service';

export const getPersonController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const result = await peopleService.getSinglePerson(req.params.personId);

  return res.send(result);
};

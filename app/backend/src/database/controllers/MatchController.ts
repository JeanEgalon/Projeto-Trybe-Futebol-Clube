import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getMatchs(req: Request, res: Response) {
    if (req.query.inProgress === 'true' || req.query.inProgress === 'false') {
      const { inProgress } = req.query;

      const result = await MatchService.getMatchsInProgress(inProgress);
      return res.status(200).json(result);
    }
    const result = await MatchService.getMatchs();
    return res.status(200).json(result);
  }
}

import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async classificationLeader(req: Request, res: Response) {
    const result = await LeaderboardService.classificationLeader();
    res.status(200).json(result);
  }

  static async classification(req: Request, res: Response) {
    const result = await LeaderboardService.classification();

    res.status(200).json(result);
  }
}

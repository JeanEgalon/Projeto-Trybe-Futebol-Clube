import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async classification(req: Request, res: Response) {
    const result = await LeaderboardService.classification();
    res.status(200).json(result);
  }

  static async filterByHomeTeam(req: Request, res: Response) {
    const result = await LeaderboardService.filterByHomeTeam();

    res.status(200).json(result);
  }

  static async filterByAwayTeam(req: Request, res: Response) {
    const result = await LeaderboardService.filterByAwayTeam();

    res.status(200).json(result);
  }
}

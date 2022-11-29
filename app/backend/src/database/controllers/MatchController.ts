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

  static async saveMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const result = await MatchService.saveMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(result);
  }

  static async changeStatusOfMatch(req: Request, res: Response) {
    const { id } = req.params;

    if (req.body.homeTeamGoals && req.body.awayTeamGoals) {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await MatchService.changeInProgressMatches(
        Number(id),
        Number(homeTeamGoals),
        Number(awayTeamGoals),
      );

      return res.status(200).json({ message: 'Done!' });
    }

    await MatchService.changeStatusOfMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}

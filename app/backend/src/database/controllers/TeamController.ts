import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async getTeams(req: Request, res: Response) {
    const result = await TeamService.getTeams();
    res.status(200).json(result);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TeamService.getTeamById(Number(id));
    res.status(200).json(result);
  }
}

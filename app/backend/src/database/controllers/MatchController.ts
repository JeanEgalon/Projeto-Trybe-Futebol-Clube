import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getMatchs(req: Request, res: Response) {
    const result = await MatchService.getMatchs();
    res.status(200).json(result);
  }
}

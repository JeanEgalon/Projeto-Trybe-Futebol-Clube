// import IMatch from '../entities/IMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  static async getMatchs(): Promise<unknown> {
    const uEmail = await MatchService.findAllMatchs();
    return uEmail;
  }

  private static async findAllMatchs(): Promise<unknown> {
    const userEmail = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return userEmail;
  }
}

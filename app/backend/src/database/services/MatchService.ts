import IMatch from '../entities/IMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  static async getMatchs(): Promise<IMatch[] | unknown> {
    const uEmail = await MatchService.findAllMatchs();

    return uEmail;
  }

  static async getMatchsInProgress(inProgress: string | unknown): Promise<IMatch[]> {
    const uEmail = await MatchService.findAllMatchs() as IMatch[];
    let param = false;
    if (inProgress === 'false') {
      param = false;
    } else { param = true; }

    const getInProgress = uEmail.filter((item) => item.inProgress === param);

    return getInProgress;
  }

  private static async findAllMatchs(): Promise<IMatch[] | unknown> {
    const userEmail = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return userEmail;
  }
}

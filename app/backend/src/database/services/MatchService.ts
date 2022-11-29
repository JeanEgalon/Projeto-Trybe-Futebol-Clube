import IMatch from '../entities/IMatch';
import INewMatch from '../entities/INewMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  static async getMatchs(): Promise<IMatch[] | unknown> {
    const uEmail = await MatchService.findAllMatchs();

    return uEmail;
  }

  static async saveMatch(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const matches = await MatchService.saveNewMatch(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );

    return matches;
  }

  static async changeStatusOfMatch(id: number) {
    const match = await MatchModel.update({ inProgress: 0 }, { where: { id } });
    return match;
  }

  static async changeInProgressMatches(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await MatchModel.update({ homeTeamGoals }, {
      where: { id },
    });

    await MatchModel.update({ awayTeamGoals }, {
      where: { id },
    });
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

  private static async saveNewMatch(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<INewMatch> {
    const inProgress = true;
    const match = MatchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return match;
  }
}

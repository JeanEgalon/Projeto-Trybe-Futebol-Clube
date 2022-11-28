import ITeam from '../entities/ITeam';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  static async getTeams(): Promise<ITeam[]> {
    const uEmail = await TeamService.findAllTeams();
    return uEmail;
  }

  static async getTeamById(id: number): Promise<ITeam | unknown> {
    const uEmail = await TeamService.findByPk(id);
    return uEmail;
  }

  private static async findAllTeams(): Promise<ITeam[]> {
    const userEmail = await TeamModel.findAll();
    return userEmail;
  }

  private static async findByPk(id: number): Promise<ITeam | unknown> {
    const userEmail = await TeamModel.findByPk(id);
    return userEmail;
  }
}

import { desempenhoAwayTeam, desempenhoHomeTeam, order } from '../utils/someFunctions';
import MatchService from './MatchService';

export default class LeaderboardService {
  static async classificationLeader() {
    const matches = await MatchService.getMatchsInProgress('false');
    const leaderboard = desempenhoHomeTeam(matches);
    return leaderboard;
  }

  static async filterByHomeTeam() {
    const partidas = await MatchService.getMatchsInProgress('false');
    const desempenhoEquipe = desempenhoHomeTeam(partidas);
    const result = order(desempenhoEquipe);
    return result;
  }

  static async filterByAwayTeam() {
    const partidas = await MatchService.getMatchsInProgress('false');
    const desempenhoEquipe = desempenhoAwayTeam(partidas);
    const result = order(desempenhoEquipe);
    return result;
  }
}

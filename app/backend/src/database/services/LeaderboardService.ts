import {
  desempenhoAwayTeam, desempenhoGeralDasEquipes, desempenhoHomeTeam, order,
} from '../utils/someFunctions';
import MatchService from './MatchService';

export default class LeaderboardService {
  static async classification() {
    const matches = await MatchService.getMatchsInProgress('false');
    const leaderboard = desempenhoGeralDasEquipes(matches);
    const result = order(leaderboard);
    return result;
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

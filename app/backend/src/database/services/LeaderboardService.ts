import { desempenhoDaEquipeNoCampeonato, order } from '../utils/someFunctions';
import MatchService from './MatchService';

export default class LeaderboardService {
  static async classificationLeader() {
    const matches = await MatchService.getMatchsInProgress('false');
    const leaderboard = desempenhoDaEquipeNoCampeonato(matches);
    return leaderboard;
  }

  static async classification() {
    const partidas = await MatchService.getMatchsInProgress('false');
    const desempenhoEquipe = desempenhoDaEquipeNoCampeonato(partidas);
    const result = order(desempenhoEquipe);
    return result;
  }
}

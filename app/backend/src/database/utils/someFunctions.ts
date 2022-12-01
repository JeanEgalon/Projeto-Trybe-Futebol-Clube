import IMatch from '../entities/IMatch';
import IResult from '../entities/IResult';

export const resultadoDaPartida = (golsMarcados: number, golsSofridos: number) => {
  const resultado = {
    vitoria: 0,
    empate: 0,
    derrota: 0,
    pontosFeitos: 0,
  };

  if (golsMarcados > golsSofridos) {
    resultado.vitoria = 1; resultado.pontosFeitos = 3;
  }
  if (golsSofridos > golsMarcados) {
    resultado.derrota = 1; resultado.pontosFeitos = 0;
  }

  if (golsMarcados === golsSofridos) {
    resultado.empate = 1; resultado.pontosFeitos = 1;
  }

  return resultado;
};

export const desempenhoNaPartida = (golsMarcados: number, golsSofridos: number): IResult => {
  const time = resultadoDaPartida(golsMarcados, golsSofridos);

  const result = {
    totalPoints: time.pontosFeitos,
    totalGames: 1,
    totalVictories: time.vitoria,
    totalDraws: time.empate,
    totalLosses: time.derrota,
    goalsFavor: golsMarcados,
    goalsOwn: golsSofridos,
    goalsBalance: golsMarcados - golsSofridos,
    efficiency: ((time.pontosFeitos / (1 * 3)) * 100).toFixed(2),
  };

  return result;
};

const atualizar = (team: IResult, game: IResult): IResult => {
  const totalGames = team.totalGames + 1;
  const totalPoints = team.totalPoints + game.totalPoints;
  const result = {
    name: team.name,
    totalPoints,
    totalGames,
    totalVictories: team.totalVictories + game.totalVictories,
    totalDraws: team.totalDraws + game.totalDraws,
    totalLosses: team.totalLosses + game.totalLosses,
    goalsFavor: team.goalsFavor + game.goalsFavor,
    goalsOwn: team.goalsOwn + game.goalsOwn,
    goalsBalance: team.goalsBalance + game.goalsBalance,
    efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
  };
  return result;
};

export const desempenhoHomeTeam = (matches: IMatch[]): IResult[] => {
  const table: IResult[] = [];
  matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome }) => {
    const teamIndexInName = table.findIndex((e) => e.name === teamHome.teamName);
    const data = desempenhoNaPartida(homeTeamGoals, awayTeamGoals);

    if (teamIndexInName < 0) {
      table.push({ name: teamHome.teamName, ...data });
    } else {
      table[teamIndexInName] = atualizar(table[teamIndexInName], data);
    }
  });

  return table;
};

export const desempenhoAwayTeam = (matches: IMatch[]): IResult[] => {
  const table: IResult[] = [];
  matches.forEach(({ homeTeamGoals, awayTeamGoals, teamAway }) => {
    const teamIndexInName = table.findIndex((e) => e.name === teamAway.teamName);
    const data = desempenhoNaPartida(awayTeamGoals, homeTeamGoals);

    if (teamIndexInName < 0) {
      table.push({ name: teamAway.teamName, ...data });
    } else {
      table[teamIndexInName] = atualizar(table[teamIndexInName], data);
    }
  });

  return table;
};

export const order = (border: IResult[]): IResult[] => {
  const newBorder: IResult[] = border;
  newBorder.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn
  ));
  return newBorder;
};

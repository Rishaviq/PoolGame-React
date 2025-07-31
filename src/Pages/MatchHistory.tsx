import { GameCard } from "../Components/GameStatCard";
import type { PlayerGame } from "../Components/GameStatCard";

export default function MathHistory() {
  const game: PlayerGame = {
    gameId: 1,
    gameDate: new Date("2025-07-30"),
    isPlayerWinner: true,
    gameIsDraw: false,
  };
  return (
    <div>
      <div>
        <GameCard playergame={game} />
      </div>
    </div>
  );
}

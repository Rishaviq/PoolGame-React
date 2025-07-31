export type PlayerGame = {
  isPlayerWinner: boolean;
  gameId: number;
  gameDate: Date;
  gameIsDraw: boolean;
};
interface GameCardProps {
  playergame: PlayerGame;
  onClick?: (id: string) => void;
}

export const GameCard = ({ playergame, onClick }: GameCardProps) => {
  const { isPlayerWinner, gameDate, gameIsDraw, gameId } = playergame;

  const resultText = gameIsDraw
    ? "Draw"
    : isPlayerWinner
    ? "Victory"
    : "Defeat";

  const resultColor = gameIsDraw
    ? "text-secondary"
    : isPlayerWinner
    ? "text-success"
    : "text-danger";

  return (
    <div
      onClick={() => onClick?.(playergame.gameId.toString())}
      className="border-bottom py-2 px-3"
    >
      <div className={`fw-semibold ${resultColor}`}>{resultText}</div>
      <div className="text-muted small d-flex gap-2">
        <span>Game ID: {gameId}</span>
        <span>•</span>
        <span>{new Date(gameDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

import React from "react";

type PlayerStats = {
  userId: number;
  userName?: string;
  isWinner: boolean;
  shotsMade: number;
  shotsAttempted: number;
  handBalls: number;
  fouls: number;
  bestStreak: number;
};
type Props = {
  stats: PlayerStats;
};
export const PlayerStatsCard: React.FC<Props> = ({
  stats,
}: {
  stats: PlayerStats;
}) => {
  const accuracy =
    stats.shotsAttempted > 0
      ? ((stats.shotsMade / stats.shotsAttempted) * 100).toFixed(1)
      : "0";

  return (
    <div
      className={`card shadow-sm mb-3 ${
        stats.isWinner ? "border-success" : "border-secondary"
      }`}
      style={{ minWidth: "250px" }}
    >
      <div
        className={`card-header text-white ${
          stats.isWinner ? "bg-success" : "bg-secondary"
        }`}
      >
        <strong>{stats.userName || `User #${stats.userId}`}</strong>
        {stats.isWinner && <span className="float-end">🏆 Winner</span>}
      </div>
      <div className="card-body p-3">
        <ul className="list-unstyled mb-0">
          <li>
            <strong>Shots:</strong> {stats.shotsMade}/{stats.shotsAttempted} (
            {accuracy}%)
          </li>
          <li>
            <strong>Best Streak:</strong> {stats.bestStreak}
          </li>
          <li>
            <strong>Handballs:</strong> {stats.handBalls}
          </li>
          <li>
            <strong>Fouls:</strong> {stats.fouls}
          </li>
        </ul>
      </div>
    </div>
  );
};

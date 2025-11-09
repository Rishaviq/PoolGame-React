import React from "react";
import { useNavigate } from "react-router-dom";

type UserStatsProps = {
  userId: number;
  rank: number;
  userName: string;
  winRate: number;
  totalGames: number;
  gamesWon: number;
  gamesLost: number;
};

const UserStats: React.FC<UserStatsProps> = ({
  userId,
  rank,
  userName,
  winRate,
  totalGames,
  gamesWon,
  gamesLost,
}) => {
  const navigate = useNavigate();
  function handleclick() {
    navigate(`/player/${userId}`);
  }

  return (
    <div className="card mb-2 shadow-sm" onClick={handleclick}>
      <div className="card-body py-2 d-flex justify-content-between align-items-center">
        <div className="fw-bold" style={{ width: "2rem" }}>
          {rank}
        </div>
        <div className="flex-grow-1 ms-2">
          <div className="fw-semibold">{userName}</div>
          <small className="text-muted">
            {gamesWon}W - {gamesLost}L ({totalGames} games)
          </small>
        </div>
        <div className="fw-bold">{winRate?.toFixed(2) ?? "0.00"}%</div>
      </div>
    </div>
  );
};

export default UserStats;

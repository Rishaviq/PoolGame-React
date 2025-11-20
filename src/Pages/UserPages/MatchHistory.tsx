import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { GameCard } from "../../Components/StatCards/GameStatCard";
import type { PlayerGame } from "../../Components/StatCards/GameStatCard";
import { useNavigate } from "react-router-dom";

interface PlayerHistoryResponse {
  playerGames: PlayerGame[];
}

export default function MatchHistory() {
  const { id } = useParams<{ id: string }>();
  const [games, setGames] = useState<PlayerGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGameClick = (gameId: string) => {
    navigate(`/game/game-info/${gameId}`);
  };

  useEffect(() => {
    if (!id) return;

    axios
      .get<PlayerHistoryResponse>(`player/${id}/history`)
      .then((res) => {
        setGames(res.data.playerGames);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch game data", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading game history...
      </div>
    );
  }

  if (error || games.length === 0) {
    return (
      <div className="text-center mt-10 text-red-600">
        {error ?? "No game history found."}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <div className="max-w-xl w-full space-y-4">
        {games.map((game) => (
          <GameCard
            onClick={handleGameClick}
            key={game.gameId}
            playergame={game}
          />
        ))}
      </div>
    </div>
  );
}

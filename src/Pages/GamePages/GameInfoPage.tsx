import { useEffect, useState } from "react";
import { PlayerStatsCard } from "../../Components/PlayerPerGameCard";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

type PlayerStats = {
  userId: number;
  userName: string;
  isWinner: boolean;
  shotsMade: number;
  shotsAttempted: number;
  handBalls: number;
  fouls: number;
  bestStreak: number;
};

type GameInfo = {
  gameId: number;
  gameDate: string;
  gameIsDraw: boolean;
};

type GameStatsResponse = {
  playerStats: PlayerStats[];
  gameInfo: GameInfo;
  isSuccesful: boolean;
  message: string | null;
};

const GameStatsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<GameStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get<GameStatsResponse>(
          `/player/game-stats/${id}`
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching game stats", err);
        setError("Failed to fetch game stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-3xl font-bold mb-4">Game #{data?.gameInfo.gameId}</h1>
      <p className="text-gray-600">
        Date: {new Date(data?.gameInfo.gameDate).toLocaleString()}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full max-w-4xl">
        {data?.playerStats.map((player) => (
          <PlayerStatsCard key={player.userId} stats={player} />
        ))}
      </div>
    </div>
  );
};

export default GameStatsPage;

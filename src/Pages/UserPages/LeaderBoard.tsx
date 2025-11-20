import React, { useEffect, useState } from "react";
import UserStats from "../../Components/StatCards/LeaderBoardCard";
import axios from "../../api/axios";

type User = {
  userId: number;
  userName: string;
  winRate: number;
  totalGames: number;
  gamesWon: number;
  gamesLost: number;
};

type LeaderboardResponse = {
  isSuccesful: boolean;
  message: string;
  leaderboardEntries: User[];
};

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderboardResponse>(
          "/player/leaderboard"
        );
        setUsers(response.data.leaderboardEntries); // ✅ use the array inside
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="container my-4">Loading leaderboard...</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3 text-center">Leaderboard</h2>
      {users.map((user, index) => (
        <UserStats
          userId={user.userId}
          rank={index + 1}
          userName={user.userName}
          winRate={user.winRate}
          totalGames={user.totalGames}
          gamesWon={user.gamesWon}
          gamesLost={user.gamesLost}
        />
      ))}
    </div>
  );
};

export default Leaderboard;

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  FaTrophy,
  FaGamepad,
  FaTimes,
  FaBullseye,
  FaDotCircle,
  FaCogs,
  FaExclamationTriangle,
  FaMedal,
} from "react-icons/fa";
import { StatCard } from "../Components/StatCard";

const statIcons = {
  "Win Rate": <FaTrophy className="text-yellow-500 text-xl" />,
  "Games Played": <FaGamepad className="text-indigo-500 text-xl" />,
  "Games Won": <FaTrophy className="text-green-500 text-xl" />,
  "Games Lost": <FaTimes className="text-red-500 text-xl" />,
  "Shot Success Rate": <FaBullseye className="text-blue-500 text-xl" />,
  "Shots Made": <FaDotCircle className="text-green-400 text-xl" />,
  "Shots Attempted": <FaDotCircle className="text-orange-400 text-xl" />,
  "Average Hand Balls": <FaCogs className="text-purple-400 text-xl" />,
  "Average Fouls": <FaExclamationTriangle className="text-pink-400 text-xl" />,
  "Best Streak": <FaMedal className="text-yellow-400 text-xl" />,
};

type PlayerStats = {
  playerWinRate?: number;
  totalGamesPlayed?: number;
  totalGamesWon?: number;
  totalGamesLost?: number;
  shotSuccessRate?: number;
  totalShotsMade?: number;
  totalShotsAttempted?: number;
  averageHandBalls?: number;
  averageFouls?: number;
  bestStreak?: number;
};

type PlayerStatsPageProps = {
  userId: string;
};

const PlayerStatsPage: React.FC<PlayerStatsPageProps> = ({ userId }) => {
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log(userId);
        axios
          .get<PlayerStats>(`player/${userId}/stats`)
          .then((res) => setStats(res.data))
          .catch((err) => console.error(err));
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, [userId]);

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">User {userId} : Statistics</h2>
      </div>

      {/* Game Outcomes */}
      <div className="mb-5">
        <h5 className="mb-3">Game Outcomes</h5>
        <div className="row">
          <StatCard
            label="Win Rate"
            value={`${stats?.playerWinRate?.toFixed(2)} %`}
            icon={statIcons["Games Won"]}
          />
          <StatCard
            label="Games Played"
            value={stats?.totalGamesPlayed}
            icon={statIcons["Games Played"]}
          />
          <StatCard
            label="Games Won"
            value={stats?.totalGamesWon}
            icon={statIcons["Games Won"]}
          />
          <StatCard
            label="Games Lost"
            value={stats?.totalGamesLost}
            icon={statIcons["Games Lost"]}
          />
        </div>
      </div>

      {/* Shot Accuracy */}
      <div className="mb-5">
        <h5 className="mb-3">Shot Accuracy</h5>
        <div className="row">
          <StatCard
            label="Shot Success Rate"
            value={`${stats?.shotSuccessRate?.toFixed(2)} %`}
            icon={statIcons["Shot Success Rate"]}
          />
          <StatCard
            label="Shots Made"
            value={stats?.totalShotsMade}
            icon={statIcons["Shots Made"]}
          />
          <StatCard
            label="Shots Attempted"
            value={stats?.totalShotsAttempted}
            icon={statIcons["Shots Attempted"]}
          />
        </div>
      </div>

      {/* Player Behavior */}
      <div className="mb-5">
        <h5 className="mb-3">Player Behavior</h5>
        <div className="row">
          <StatCard
            label="Average Hand Balls"
            value={stats?.averageHandBalls?.toFixed(2)}
            icon={statIcons["Average Hand Balls"]}
          />
          <StatCard
            label="Average Fouls"
            value={stats?.averageFouls?.toFixed(2)}
            icon={statIcons["Average Fouls"]}
          />
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h5 className="mb-3">Achievements</h5>
        <div className="row">
          <StatCard
            label="Best Streak"
            value={stats?.bestStreak}
            icon={statIcons["Best Streak"]}
          />
        </div>
      </div>
    </div>
  );
};
export default PlayerStatsPage;

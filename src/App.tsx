import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/UserPages/LogInPage";
import RegisterPage from "./Pages/UserPages/RegisterPage";
import Layout from "./Pages/SharedPages/Layout";
import PlayerStatsPage from "./Pages/UserPages/PersonalStatsPage";
import { getUserId } from "./auth/token";
import { PlayerStatsWrapper } from "./Pages/UserPages/PersonalStatsWrapper";
import NewGamePage from "./Pages/GamePages/NewGamePage";
import SaveGameStatsPage from "./Pages/GamePages/LiveGamePage";
import MathHistory from "./Pages/UserPages/MatchHistory";
import GameInfoPage from "./Pages/GamePages/GameInfoPage";
import Leaderboard from "./Pages/UserPages/LeaderBoard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/player/:id" element={<PlayerStatsWrapper />} />
        <Route path="/game" element={<NewGamePage />} />
        <Route path="/save-game" element={<SaveGameStatsPage />} />
        <Route path="/player/:id/history" element={<MathHistory />} />
        <Route path="/game/game-info/:id" element={<GameInfoPage />} />
        <Route path="/LeaderBoard" element={<Leaderboard />} />

        <Route
          index
          element={
            <PlayerStatsPage userId={getUserId()?.toString() || "null"} />
          }
        />
        {/* Add more routes here */}
      </Route>
    </Routes>
  );
}

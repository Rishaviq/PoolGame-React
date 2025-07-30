import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import Layout from "./Pages/Layout";
import PlayerStatsPage from "./Pages/PersonalStatsPage";
import { getUserId } from "./auth/token";
import { PlayerStatsWrapper } from "./Pages/PersonalStatsWrapper";
import LiveGamePage from "./Pages/LiveGamePage";
import NewGamePage from "./Pages/NewGamePage";
import SaveGameStatsPage from "./Pages/LiveGamePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/player/:id" element={<PlayerStatsWrapper />} />
        <Route path="/game" element={<NewGamePage />} />
        <Route path="/save-game" element={<SaveGameStatsPage />} />
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

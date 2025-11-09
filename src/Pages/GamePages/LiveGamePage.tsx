import React, { useState } from "react";
import SaveGameStatsForm, {
  type GameStatsFormData,
} from "../../Components/SaveGameStatsForm";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useLocation, Navigate } from "react-router-dom";
import SelectWinAlert from "../../Components/SelectWinAlert";

type LocationState = { gameId: number };

const SaveGameStatsPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [alertIsVisible, SetVisability] = useState<boolean | null>(null);
  const state = location.state as LocationState | null;
  const [playerStats, setPlayerStats] = useState<GameStatsFormData | null>(
    null
  );
  if (!state?.gameId) {
    // fallback if someone directly types /save-game
    return <Navigate to="/" replace />;
  }
  const SendSubmit = async (formData: GameStatsFormData) => {
    try {
      const response = axios.post("player/stats/save", formData);

      if ((await response).status == 200) {
        setMessage("Game stats saved successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect to home or another page after success
        }, 2000);
      } else {
        const error = (await response).statusText;
        setMessage(`Failed to save stats: ${error}`);
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  function SubmitWin(): void {
    const updatedStats = { ...playerStats, isWinner: true };
    SendSubmit(updatedStats as GameStatsFormData);
    SetVisability(false);
  }

  function SubmitLoss(): void {
    const updatedStats = { ...playerStats, isWinner: false };
    SendSubmit(updatedStats as GameStatsFormData);
    SetVisability(false);
  }

  function ClsoeAlert(): void {
    SetVisability(false);
  }
  const HandleSubmit = async (formData: GameStatsFormData) => {
    SetVisability(true);
    setPlayerStats(formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Save Game Stats</h2>
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      <SaveGameStatsForm
        gameId={state?.gameId.toString() || ""}
        onSubmit={HandleSubmit}
      />
      {alertIsVisible && (
        <SelectWinAlert
          OnYes={SubmitWin}
          OnNo={SubmitLoss}
          OnCancel={ClsoeAlert}
        />
      )}
    </div>
  );
};

export default SaveGameStatsPage;

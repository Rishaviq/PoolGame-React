import React, { useEffect, useState } from "react";
import SaveGameStatsForm, {
  type GameStatsFormData,
} from "../../Components/Forms/SaveGameStatsForm";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useLocation, Navigate } from "react-router-dom";
import SelectWinAlert from "../../Components/Alerts/SelectWinAlert";
import { OpponentCard } from "../../Components/StatCards/OpponentCard";
import { useGameHub } from "../../api/useGameHub";
import { JoinLiveGame } from "../../api/UpdateLiveStatsHelper";
import { getProfileName, getUserId } from "../../auth/token";
import { GetGameConnection } from "../../api/connectionBuilder";
import * as signalR from "@microsoft/signalr";
import { useLeaveGameOnUnload } from "../../api/useStopConnectionOnLeave";

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
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  const { opponentStats } = useGameHub(connection);

  useLeaveGameOnUnload(connection);

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
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const conn = await GetGameConnection();
        if (!alive) return;
        setConnection(conn); // store in state or context
        JoinGame();

        if (!conn) {
          console.log("return error");
          return;
        }
      } catch (err) {
        console.error("Failed to connect:", err);
      }
    })();

    return () => {
      alive = false;
    };
  }, [location]);

  function JoinGame(): void {
    console.log("joining game");
    JoinLiveGame({
      gameId: state?.gameId ?? 0,
      userId: parseInt(getUserId() || ""),
      profileName: getProfileName() || "",
    });
  }

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
      <div className="row justify-content-center">
        {opponentStats.map((player) => (
          <div key={player.userId} className="col-md-6 mb-4">
            <OpponentCard stats={player} profileName={player.profileName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaveGameStatsPage;

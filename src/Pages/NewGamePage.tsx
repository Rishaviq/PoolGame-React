import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

type CreateGameResponse = {
  gameId: number;
};

export default function NewGamePage() {
  const navigate = useNavigate();
  const [joinGameId, setJoinGameId] = useState("");

  const handleCreateGame = async () => {
    try {
      const response = await axios.post<CreateGameResponse>("game/create");

      if (response.status !== 200) {
        throw new Error("Game creation failed");
      }

      navigate("/save-game", { state: { gameId: response.data.gameId } });
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedId = parseInt(joinGameId);
    if (isNaN(parsedId)) {
      alert("Please enter a valid numeric Game ID.");
      return;
    }

    navigate("/save-game", { state: { gameId: parsedId } });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Start a New Game</h4>
            <button
              onClick={handleCreateGame}
              className="btn btn-primary btn-lg"
            >
              Create Game
            </button>
          </div>
        </div>

        <div className="col-md-5 mb-4">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Join Existing Game</h4>
            <form onSubmit={handleJoinGame}>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Enter Game ID"
                  value={joinGameId}
                  onChange={(e) => setJoinGameId(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success btn-lg w-100">
                Join Game
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

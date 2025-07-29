import React, { useState } from "react";
import SaveGameStatsForm, {
  type GameStatsFormData,
} from "../Components/SaveGameStatsForm";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const SaveGameStatsPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData: GameStatsFormData) => {
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Save Game Stats</h2>
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}
      <SaveGameStatsForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SaveGameStatsPage;

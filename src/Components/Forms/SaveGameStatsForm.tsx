import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProfileName, getUserId } from "../../auth/token";
import { UpdateLiveStats } from "../../api/UpdateLiveStatsHelper";

interface GameStatsFormProps {
  onSubmit: (data: GameStatsFormData) => void;
  gameId: string;
}

export interface GameStatsFormData {
  gameId: number;
  userId: number;
  profileName?: string;
  isWinner: boolean;
  shotsMade: number;
  shotsAttempted: number;
  handBalls: number;
  fouls: number;
  bestStreak: number;
}

const SaveGameStatsForm: React.FC<GameStatsFormProps> = ({
  onSubmit,
  gameId,
}) => {
  const [form, setForm] = useState<GameStatsFormData>({
    gameId: parseInt(gameId),
    userId: parseInt(getUserId() || ""),
    profileName: getProfileName() || "",
    isWinner: false,
    shotsMade: 0,
    shotsAttempted: 0,
    handBalls: 0,
    fouls: 0,
    bestStreak: 0,
  });

  const [isLoaded, setLoaded] = useState(false);

  const updateField = (name: keyof GameStatsFormData, delta: number) => {
    setForm((prev) => {
      const value = prev[name];
      if (typeof value === "number") {
        return {
          ...prev,
          [name]: Math.max(0, value + delta), // prevent going negative
        };
      }
      return prev;
    });
  };

  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const err: string[] = [];

    if (form.gameId <= 0) err.push("Game ID is required and must be positive.");
    if (form.userId <= 0) err.push("User ID is required and must be positive.");
    if (form.shotsMade < 0 || form.shotsMade > 15)
      err.push("Shots Made must be between 0 and 15.");
    if (form.shotsAttempted < 0)
      err.push("Shots Attempted must be a positive number.");
    if (form.handBalls < 0) err.push("Hand Balls must be a positive number.");
    if (form.fouls < 0) err.push("Fouls must be a positive number.");
    if (form.bestStreak < 0 || form.bestStreak > 15)
      err.push("Best Streak must be between 0 and 15.");
    if (form.shotsMade > 15)
      err.push("Player can't make more shots than available balls.");

    setErrors(err);
    return err.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    if (isLoaded) {
      document.cookie = `form=${encodeURIComponent(
        JSON.stringify(form)
      )}; path=/; max-age=86400; SameSite=Strict; Secure`;
    }
    console.log("savecookies");
    UpdateLiveStats();
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  function LoadCookies(): void {
    const match = document.cookie.match(/(?:^|; )form=([^;]*)/);
    if (match) {
      const cookieFormData = JSON.parse(decodeURIComponent(match[1]));
      console.log(cookieFormData);
      if (cookieFormData.gameId === form.gameId) {
        setForm({
          ...cookieFormData,
          userId: parseInt(getUserId() || ""),
        });
      }
    }
    setLoaded(true);
    console.log("LoadCookies");
  }
  useEffect(() => {
    LoadCookies();
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Game Stats Submission</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                {/* Game ID and User ID read-only */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="gameId" className="form-label">
                      Game ID
                    </label>
                    <input
                      type="number"
                      id="gameId"
                      name="gameId"
                      className="form-control bg-light"
                      value={form.gameId}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userId" className="form-label">
                      User ID
                    </label>
                    <input
                      type="number"
                      id="userId"
                      name="userId"
                      className="form-control bg-light"
                      value={form.userId}
                      readOnly
                    />
                  </div>
                </div>

                {/* Numeric inputs with buttons */}
                {(
                  [
                    { name: "shotsMade", label: "Shots Made", max: 15 },
                    { name: "shotsAttempted", label: "Shots Attempted" },
                    { name: "bestStreak", label: "Best Streak", max: 15 },
                    { name: "handBalls", label: "Hand Balls" },
                    { name: "fouls", label: "Fouls" },
                  ] as const
                ).map(({ name, label }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">
                      {label}
                    </label>
                    <div className="input-group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => updateField(name, -1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id={name}
                        name={name}
                        className="form-control text-center"
                        value={form[name] as number}
                        onChange={handleChange}
                        min={0}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => updateField(name, 1)}
                      >
                        +
                      </button>
                    </div>
                    {errors.find((e) =>
                      e.toLowerCase().includes(label.toLowerCase())
                    ) && (
                      <div className="form-text text-danger">
                        {errors.find((e) =>
                          e.toLowerCase().includes(label.toLowerCase())
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Submit button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Save Stats
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveGameStatsForm;

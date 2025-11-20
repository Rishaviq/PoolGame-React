import type { EnemyPlayerCard } from "../../api/useGameHub";

interface OpponentCardProps {
  stats: EnemyPlayerCard;
  profileName: string;
}

export const OpponentCard: React.FC<OpponentCardProps> = ({
  stats,
  profileName,
}) => {
  // Fields to display with optional max values for context
  const fields = [
    { key: "shotsMade", label: "Shots Made", max: 15 },
    { key: "shotsAttempted", label: "Shots Attempted" },
    { key: "bestStreak", label: "Best Streak", max: 15 },
    { key: "handBalls", label: "Hand Balls" },
    { key: "fouls", label: "Fouls" },
  ] as const;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0"> Opponent Stats</h3>
            </div>
            <div className="card-body">
              {/* Game ID and User Name */}
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="form-control text-center bg-light"
                  value={profileName}
                  readOnly
                />
              </div>

              {/* Dynamic stats fields */}
              {fields.map(({ key, label }) => (
                <div className="mb-3" key={key}>
                  <label htmlFor={key} className="form-label">
                    {label}
                  </label>
                  <input
                    type="number"
                    id={key}
                    className="form-control text-center bg-light"
                    value={stats[key] || 0}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

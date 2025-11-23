import { useParams } from "react-router-dom";
import PlayerStatsPage from "./PersonalStatsPage";

export const PlayerStatsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>User ID missing</div>;

  return <PlayerStatsPage userId={id} isHome={false} />;
};

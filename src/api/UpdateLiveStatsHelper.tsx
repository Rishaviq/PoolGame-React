import type { GameStatsFormData } from "../Components/Forms/SaveGameStatsForm";
import { GetGameConnection } from "./connectionBuilder";

export interface LiveStatsUpdateRequest {
  playerId: number;
  gameId: number;
  profileName: string;
  stats?: LiveStats;
}

interface LiveStats {
  shotsMade: number;
  shotsAttempted: number;
  handBalls: number;
  fouls: number;
  bestStreak: number;
}

export const UpdateLiveStats = async () => {
  const connectionRef = await GetGameConnection();
  console.log("Updating Live Stats");
  const match = document.cookie.match(/(?:^|; )form=([^;]*)/);
  if (match) {
    const cookieFormData: GameStatsFormData = JSON.parse(
      decodeURIComponent(match[1]),
    );
    const request: LiveStatsUpdateRequest = {
      playerId: cookieFormData.userId,
      gameId: cookieFormData.gameId,
      profileName: cookieFormData.profileName ?? "",
      stats: {
        shotsAttempted: cookieFormData.shotsAttempted,
        shotsMade: cookieFormData.shotsMade,
        fouls: cookieFormData.fouls,
        handBalls: cookieFormData.handBalls,
        bestStreak: cookieFormData.bestStreak,
      },
    };
    await connectionRef.invoke("UpdateLiveStats", request);
    console.log("Sending update on stats");
  }
};

export const JoinLiveGame = async (request: LiveStatsUpdateRequest) => {
  const connectionRef = await GetGameConnection();

  const match = document.cookie.match(/(?:^|; )form=([^;]*)/);
  if (!match) {
    return;
  }

  const cookieFormData: GameStatsFormData = JSON.parse(
    decodeURIComponent(match[1]),
  );

  request.stats = {
    shotsAttempted: cookieFormData.shotsAttempted,
    shotsMade: cookieFormData.shotsMade,
    fouls: cookieFormData.fouls,
    handBalls: cookieFormData.handBalls,
    bestStreak: cookieFormData.bestStreak,
  };

  connectionRef.invoke("JoinGame", request);
};

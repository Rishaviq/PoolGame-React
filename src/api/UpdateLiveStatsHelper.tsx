import type { GameStatsFormData } from "../Components/Forms/SaveGameStatsForm";
import { GetGameConnection, RememberJoinRequest } from "./connectionBuilder";

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

  if (match) {
    const c: GameStatsFormData = JSON.parse(decodeURIComponent(match[1]));
    request.stats = {
      shotsAttempted: c.shotsAttempted,
      shotsMade: c.shotsMade,
      fouls: c.fouls,
      handBalls: c.handBalls,
      bestStreak: c.bestStreak,
    };
  } else {
    request.stats = {
      shotsAttempted: 0,
      shotsMade: 0,
      fouls: 0,
      handBalls: 0,
      bestStreak: 0,
    };
  }

  RememberJoinRequest(request);
  await connectionRef.invoke("JoinGame", request);
};

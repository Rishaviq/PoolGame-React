import type { GameStatsFormData } from "../Components/Forms/SaveGameStatsForm";
import { GetGameConnection } from "./connectionBuilder";
import type { StatUpdateRequest } from "./useGameHub";

interface JoinGameRequest {
  userId: number;
  gameId: number;
  profileName: string;
}

export const UpdateLiveStats = async () => {
  const connectionRef = await GetGameConnection();
  console.log("Updating Live Stats");
  const match = document.cookie.match(/(?:^|; )form=([^;]*)/);
  if (match) {
    let request: StatUpdateRequest;
    const cookieFormData: GameStatsFormData = JSON.parse(
      decodeURIComponent(match[1])
    );
    request = {
      userId: cookieFormData.userId,
      profileName: cookieFormData.profileName ?? "",
      shotsAttempted: cookieFormData.shotsAttempted,
      shotsMade: cookieFormData.shotsMade,
      fouls: cookieFormData.fouls,
      handBalls: cookieFormData.handBalls,
      bestStreak: cookieFormData.bestStreak,
    };
    await connectionRef.invoke("UpdateLiveStats", request);
    console.log("Sending update on stats");
  }
};

export const JoinLiveGame = async (request: JoinGameRequest) => {
  const connectionRef = await GetGameConnection();
  connectionRef.invoke("JoinGame", {
    UserId: request.userId,
    GameId: request.gameId,
    ProfileName: request.profileName,
  });
};

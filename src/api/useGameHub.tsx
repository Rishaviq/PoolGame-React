import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getProfileName, getUserId } from "../auth/token";
import type { GameStatsFormData } from "../Components/Forms/SaveGameStatsForm";
import { GetGameConnection, StopGameConnection } from "./connectionBuilder";
import { UpdateLiveStats } from "./UpdateLiveStatsHelper";
import { useLocation } from "react-router-dom";

interface JoinGameRequest {
  userId: number;
  gameId: number;
  profileName: string;
}
export type StatUpdateRequest = {
  userId: number;
  profileName: string;
  shotsMade: number | null;
  shotsAttempted: number | null;
  handBalls: number | null;
  fouls: number | null;
  bestStreak: number | null;
};

export type EnemyPlayerCard = {
  userId: number;
  profileName: string;
  shotsMade?: number | null;
  shotsAttempted?: number | null;
  handBalls?: number | null;
  fouls?: number | null;
  bestStreak?: number | null;
};

export const useGameHub = (connection: signalR.HubConnection | null) => {
  const [opponentStats, setPlayerStats] = useState<EnemyPlayerCard[]>([]);
  const [isConnected, setConnected] = useState(false);
  const playerId = parseInt(getUserId() ?? "");
  const profileName = getProfileName();
  const location = useLocation();

  useEffect(() => {
    if (!connection) return;
    if ((connection as any)._eventsAttached) return;
    connection.on("AddPlayer", (request: JoinGameRequest) => {
      if (request.userId === playerId) return;

      setPlayerStats((prev) => {
        if (prev.some((player) => player.userId === request.userId))
          return prev;
        console.log("Adding Player");
        return [
          ...prev,
          { userId: request.userId, profileName: request.profileName },
        ];
      });
    });

    // Listen for players leaving
    connection.on("RemovePlayer", (playerId: number) => {
      console.log("remove player");
      setPlayerStats((prev) =>
        prev.filter((player) => player.userId !== playerId)
      );
      console.log("Removing Player");
    });

    connection.on("SendUpdate", () => {
      console.log("entered send update");
      UpdateLiveStats();
    });

    connection.on("UpdateUser", (request: StatUpdateRequest) => {
      setPlayerStats((prev) => {
        const exists = prev.find((p) => p.userId === request.userId);
        if (exists) {
          return prev.map((player) =>
            player.userId === request.userId
              ? {
                  ...player,
                  profileName: request.profileName || "",
                  shotsMade: request.shotsMade,
                  shotsAttempted: request.shotsAttempted,
                  handBalls: request.handBalls,
                  fouls: request.fouls,
                  bestStreak: request.bestStreak,
                }
              : player
          );
        } else {
          return [
            ...prev,
            {
              userId: request.userId,
              profileName: request.profileName || "",
              shotsMade: request.shotsMade,
              shotsAttempted: request.shotsAttempted,
              handBalls: request.handBalls,
              fouls: request.fouls,
              bestStreak: request.bestStreak,
            },
          ];
        }
      });
    });

    (connection as any)._eventsAttached = true;
  }, [connection]);

  return { opponentStats };
};

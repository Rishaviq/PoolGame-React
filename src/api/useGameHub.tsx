/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getUserId } from "../auth/token";
import type { LiveStatsUpdateRequest } from "./UpdateLiveStatsHelper";

export type PlayerStats = {
  playerId: number;
  profileName: string;
  shotsMade: number | null;
  shotsAttempted: number | null;
  handBalls: number | null;
  fouls: number | null;
  bestStreak: number | null;
};

export type EnemyPlayerCard = {
  playerId: number;
  profileName: string;
  shotsMade?: number | null;
  shotsAttempted?: number | null;
  handBalls?: number | null;
  fouls?: number | null;
  bestStreak?: number | null;
};

export const useGameHub = (connection: signalR.HubConnection | null) => {
  const [opponentStats, setPlayerStats] = useState<EnemyPlayerCard[]>([]);
  const playerId = parseInt(getUserId() ?? "");

  useEffect(() => {
    if (!connection) return;
    if ((connection as any)._eventsAttached) return;

    connection.on("AddNewPlayer", (request: PlayerStats) => {
      if (request.playerId === playerId) return;

      setPlayerStats((prev) => {
        if (prev.some((player) => player.playerId === request.playerId))
          return prev;
        console.log("Adding Player");
        return [
          ...prev,
          {
            playerId: request.playerId,
            profileName: request.profileName,
            shotsMade: request.shotsMade,
            shotsAttempted: request.shotsAttempted,
            handBalls: request.handBalls,
            fouls: request.fouls,
            bestStreak: request.bestStreak,
          },
        ];
      });
    });

    // Listen for players leaving
    connection.on("RemovePlayer", (playerId: number) => {
      console.log("remove player");
      setPlayerStats((prev) =>
        prev.filter((player) => player.playerId !== playerId),
      );
      console.log("Removing Player");
    });

    connection.on("UpdateUser", (request: LiveStatsUpdateRequest) => {
      setPlayerStats((prev) => {
        return prev.map((player) => {
          if (player.playerId !== request.playerId) {
            return player;
          }

          return {
            playerId: request.playerId,
            profileName: request.profileName || "",
            shotsMade: request.stats?.shotsMade ?? 0,
            shotsAttempted: request.stats?.shotsAttempted ?? 0,
            handBalls: request.stats?.handBalls ?? 0,
            fouls: request.stats?.fouls ?? 0,
            bestStreak: request.stats?.bestStreak ?? 0,
          };
        });
      });
    });

    connection.on("CreateGame", (playersInGame: PlayerStats[]) => {
      playersInGame.forEach((player) => {
        if (player.playerId === playerId) return;
        setPlayerStats((prev) => {
          prev = [
            ...prev,
            {
              playerId: player.playerId,
              profileName: player.profileName,
              shotsMade: player.shotsMade,
              shotsAttempted: player.shotsAttempted,
              handBalls: player.handBalls,
              fouls: player.fouls,
              bestStreak: player.bestStreak,
            },
          ];
          return prev;
        });
      });
    });

    (connection as any)._eventsAttached = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  return { opponentStats };
};

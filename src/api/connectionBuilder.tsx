import * as signalR from "@microsoft/signalr";
import type { LiveStatsUpdateRequest } from "./UpdateLiveStatsHelper";

let connection: signalR.HubConnection | null = null;
let startPromise: Promise<void> | null = null;
let lastJoinRequest: LiveStatsUpdateRequest | null = null;

export function RememberJoinRequest(req: LiveStatsUpdateRequest | null) {
  lastJoinRequest = req;
}

export function GetGameConnection(): Promise<signalR.HubConnection> {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/LiveGame`)
      .withAutomaticReconnect()
      .build();

    connection.onreconnected(async () => {
      if (!lastJoinRequest || !connection) return;
      try {
        await connection.invoke("JoinGame", lastJoinRequest);
      } catch (e) {
        console.error("Re-join after reconnect failed", e);
      }
    });

    startPromise = connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
      })
      .catch((err) => {
        console.error("SignalR start error:", err);
        connection = null;
        startPromise = null;
        throw err;
      });
  }

  if (!startPromise) {
    // This can happen if previous start failed
    return Promise.reject("Connection not initialized");
  }

  return startPromise.then(() => connection!);
}

export function StopGameConnection() {
  console.log("Closing connection");
  return () => {
    if (connection) {
      connection.stop();
      connection = null;
    }
  };
}

export async function ResetGameConnection() {
  const old = connection;
  connection = null;
  startPromise = null;
  try {
    await old?.stop();
  } catch {
    console.error("error in the resetGameConnection");
  }
}

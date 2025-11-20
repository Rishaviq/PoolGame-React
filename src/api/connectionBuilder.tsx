import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
let startPromise: Promise<void> | null = null;

export function GetGameConnection(): Promise<signalR.HubConnection> {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7165/LiveGame")
      .withAutomaticReconnect()
      .build();

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

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StopGameConnection } from "./connectionBuilder";
import * as signalR from "@microsoft/signalr";

export const useLeaveGameOnUnload = (
  connection: signalR.HubConnection | null
) => {
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (connection) {
        // Step 1: leave the game group
        connection
          .invoke("LeaveGame")
          .then(() => {
            StopGameConnection()();
            console.log("Connection stopped and left the game group.");
          })
          .catch((err) => console.error("Failed to leave game:", err));
      }
    };
  }, [location.pathname, connection]);
};

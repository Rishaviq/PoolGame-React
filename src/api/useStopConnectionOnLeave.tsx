import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useLeaveGameOnUnload = (
  connection: signalR.HubConnection | null,
) => {
  const connRef = useRef(connection);
  connRef.current = connection;

  useEffect(() => {
    return () => {
      const c = connRef.current;
      if (!c) return;
      c.invoke("LeaveGame")
        .catch((err) => console.error("Failed to leave game:", err))
        .finally(() => c.stop());
    };
  }, []);
};

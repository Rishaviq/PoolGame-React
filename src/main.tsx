import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
);

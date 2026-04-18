import { useState } from "react";
import LogInForm from "../../Components/Forms/LogInForm";
//import axios from "../api/axios";
import { useAuth } from "../../auth/AuthContext";
import { setProfileName, setUserId } from "../../auth/token";
import "../../style/_auth.scss";

export default function LogIn() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.status >= 400 && response.status < 500) {
        setErrorMessage(data.message);
      } else if (!response.ok) {
        const error = await response.text();
        throw new Error(`Login failed: ${error}`);
      } else {
        login(data.jwt);
        setUserId(data.id);
        setProfileName(data.profileName);
        console.log("Id:", data.id);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light auth">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <LogInForm errorMessage={errorMessage} onSubmit={handleLogin} />
      </div>
    </div>
  );
}

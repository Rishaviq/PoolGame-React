import LogInForm from "../../Components/Forms/LogInForm";
//import axios from "../api/axios";
import { useAuth } from "../../auth/AuthContext";
import { setProfileName, setUserId } from "../../auth/token";

export default function LogIn() {
  const { login } = useAuth();
  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch("https://poolgameapi.com/api/v2/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Login failed: ${error}`);
      }

      const data = await response.json();
      console.log("JWT:", data.jwt); // Replace with actual logic (e.g., saving to localStorage, redirect)
      login(data.jwt);
      setUserId(data.id);
      setProfileName(data.profileName);
      console.log("Id:", data.id);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <LogInForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

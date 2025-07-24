import { useState, type FormEvent } from "react";

type Credentials = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (credentials: Credentials) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "auto" }}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="username" style={{ display: "block", marginBottom: 4 }}>
          Username:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 8 }}
          required
          autoComplete="username"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8 }}
          required
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: 10,
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          fontWeight: "bold",
        }}
      >
        Log In
      </button>
    </form>
  );
}

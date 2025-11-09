import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getUserId, clearToken, clearUserId } from "../../auth/token";

export default function Layout() {
  const [loggedIn, setLoggedIn] = useState(() =>
    document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("token="))
  );

  function logout(): void {
    clearToken();
    clearUserId();
    setLoggedIn(false);
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light text-dark">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          MyApp
        </Link>

        {/* 🔧 Toggler button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔧 Collapse content with matching ID */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/game">
                New Game
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/player/" + getUserId() + "/history"}
              >
                Game History
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/Leaderboard"}>
                Leaderboard
              </Link>
            </li>

            {loggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled">
                    Logged in as <strong>{getUserId() ?? "User"}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-outline-danger btn-sm nav-link"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <main className="container my-4 flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
}

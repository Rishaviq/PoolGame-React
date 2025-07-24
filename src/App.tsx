import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LogInPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* Add more routes here */}
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      {/* Add more routes here */}
    </Routes>
  );
}

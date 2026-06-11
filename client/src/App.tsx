import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  UserProfile from "@/pages/user-profile";
import HomePage from "./pages/home-page";
import LoginPage from "@/pages/login-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
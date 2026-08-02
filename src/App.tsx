import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LearningDashboard from "./pages/LearningDashboard";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import MockInterview from "./pages/MockInterview";
import ProgressReport from "./pages/ProgressReport";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning" element={<LearningDashboard />} />
            <Route path="/skill-gap" element={<SkillGapAnalyzer />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/progress" element={<ProgressReport />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
import "./index.css"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "./components/layout/authLayout/AuthLayout";
import { HomePage } from "./pages/home/HomePage";
import { AuthServices } from "./services/AuthServices";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return AuthServices.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/login" element={<AuthLayout />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

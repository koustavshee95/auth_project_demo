import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { AuthServices } from "../../services/AuthServices";

export const HomePage = () => {
  const navigate = useNavigate();
  const userEmail = AuthServices.getUserEmail();

  const handleLogout = () => {
    AuthServices.logout();
    navigate("/");
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Welcome to Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="home-content">
        <p>You are logged in as: <strong>{userEmail}</strong></p>
        <p>Good Afternoon!</p>
      </div>
    </div>
  );
};

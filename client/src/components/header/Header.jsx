import React from "react";
import { useAuth } from "../../context/AuthContext";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import Link

const Header = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  // Handle the logout Handler...
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="header-area">
      <div className="header">
        <nav>
          <div className="header-logo">
            <img src="logo.jpg" alt="logo" />
            <h1>Bank Management</h1>
          </div>
          <div className="header-menu">
            {user ? (
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <button onClick={handleLogoutClick} className="button-link">
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login">Login</Link> {/* ✅ Use Link */}
                </li>
                <li>
                  <Link to="/register">Register</Link> {/* ✅ Use Link */}
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

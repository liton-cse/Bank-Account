import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle Logout
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
    setMenuOpen(false); // Close menu on logout
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header-area">
      <div className="header">
        <nav>
          <div className="header-logo">
            <img src="/logo.jpg" alt="logo" />
            <h1>Bank Management</h1>
          </div>

          {/* ✅ Responsive Menu */}
          <div className="header-menu" ref={menuRef}>
            {/* Hamburger Menu */}
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={menuOpen ? "open" : ""}></span>
              <span className={menuOpen ? "open" : ""}></span>
              <span className={menuOpen ? "open" : ""}></span>
            </div>

            {/* ✅ Navigation Menu */}
            <ul className={`menu-list ${menuOpen ? "show" : ""}`}>
              {user ? (
                <>
                  <li>
                    <Link to="/home" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/deposit" onClick={() => setMenuOpen(false)}>
                      Deposit
                    </Link>
                  </li>
                  <li>
                    <Link to="/withdrow" onClick={() => setMenuOpen(false)}>
                      Withdrow
                    </Link>
                  </li>
                  <li>
                    <Link to="/transfer" onClick={() => setMenuOpen(false)}>
                      Transfer Money
                    </Link>
                  </li>
                  <li>
                    <Link to="/history" onClick={() => setMenuOpen(false)}>
                      Histoty
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogoutClick} className="button-link">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => setMenuOpen(false)}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

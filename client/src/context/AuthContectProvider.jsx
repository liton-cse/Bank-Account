import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // Import AuthContext from the new file
import { register, login as loginUser, logout } from "./authFunction";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = () => {
      const userStored = localStorage.getItem("user");
      if (userStored) {
        setUser(JSON.parse(userStored));
      }
      setLoading(false);
    };

    checkUser(); // Calling the async function inside useEffect
  }, []);

  // Function to handle login
  const handleLogin = async ({ email, password }) => {
    const loggedInUser = await loginUser({ email, password });
    if (loggedInUser) {
      setUser(loggedInUser);
      return { loggedInUser }; // Update state immediately
    } else {
      console.error("Login failed:", loggedInUser.message);
    }
  };

  // Function to handle the logout
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, handleLogin, handleLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // Import AuthContext from the new file
import { register, login as loginUser, logout } from "./authFunction";
import {
  deposit,
  withdrow,
  transferMoney,
  history,
  latestHistory,
} from "./TransactionFunction";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = () => {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        setUser(userToken);
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
    <AuthContext.Provider
      value={{
        user,
        register,
        handleLogin,
        handleLogout,
        deposit,
        withdrow,
        transferMoney,
        history,
        latestHistory,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext } from "react";

// Create context to be used throughout the a
export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

// import { useContext, createContext } from "react";

// export const AuthContext = createContext(null);

// // ✅ Custom hook to use AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

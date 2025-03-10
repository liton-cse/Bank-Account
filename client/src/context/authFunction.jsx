import axios from "axios";

// ✅ Get API URL from .env
const URL = import.meta.env.VITE_API_URL;

// 🔄 Updated register function with headers
export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      `${URL}/auth/register`,
      { name, email, password },
      {
        headers: { "Content-Type": "application/json" }, // ✅ Specify content type
      }
    );
    const userData = response.data;
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, user: userData };
  } catch (error) {
    console.error("Registration error:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || "Registration Failed",
    };
  }
};

// 🔄 Updated login function with headers
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${URL}/auth/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" }, // ✅ Specify content type
      }
    );
    const userData = response.data;
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, user: userData };
  } catch (error) {
    console.error("Login error:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || "Login Failed",
    };
  }
};

// 🔄 Logout function: clears user data from localStorage
export const logout = () => {
  localStorage.removeItem("user"); // ❌ Remove user data from localStorage
};

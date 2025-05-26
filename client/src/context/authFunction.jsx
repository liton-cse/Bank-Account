import axios from "axios";
import { userInfo } from "../../utility/api";

// ✅ Get API URL from .env
const URL = import.meta.env.VITE_API_URL;

// 🔄 Updated register function with headers
export const register = async (formData) => {
 
  try {
    const response = await axios.post(
      `${URL}/auth/register`,
      formData ,

    );
    const userData = response.data;
    localStorage.setItem("token", userData.token);
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
    localStorage.setItem("token", userData.token);
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
// ❌ Remove user data from localStorage
  localStorage.removeItem("token");
};


export const getUserInfo = async ()=>{
  try{
    const response = await userInfo();
    return{
      success:true,
      message:response.data,
    }
  }catch(err){
    console.log(`Error:`, err);
  }
}

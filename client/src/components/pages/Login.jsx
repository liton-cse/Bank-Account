import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const handdleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin({ email, password });
      if (response.loggedInUser.success) {
        navigate("/home");
      } else {
        setError(response.message);
      }
    } catch {
      setError("somting went wrong");
    }
  };
  return (
    <div className="login-area">
      <div className="login">
        <h1 className="login-header">Sign In</h1>
        <div className="login-box">
          <form onSubmit={handdleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="name"
              value={email}
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <p>You don't have account?</p>
        <Link to={"/register"}>Register</Link>
        {error && <p style={{ color: "red" }}> {error}</p>}
      </div>
    </div>
  );
};
export default Login;

import React, { useState } from "react";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubbmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await register({ name, email, password });
      console.log(result);
      if (result.success) {
        navigate("/login");
      } else {
        setError(result.message);
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="register-area">
      <div className="register">
        <h1 className="register-heading">Sign Up</h1>
        <div className="register-box">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubbmit}>
            <label htmlFor="fullname">Name</label>
            <input
              type="text"
              id="fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
        <p>Already have an account?</p>
        <Link to={"/login"} className="register-link">
          Login
        </Link>
      </div>
    </div>
  );
};
export default Register;

import React, { useState } from "react";
import "../../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar,setAvatar] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar); // appending file
      const result = await register(formData);
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
          <form onSubmit={handleSubmit}>
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
           <label htmlFor="avatar">Image</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              placeholder="Enter your password"
              required
              onChange={(e) => setAvatar(e.target.files[0])}
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

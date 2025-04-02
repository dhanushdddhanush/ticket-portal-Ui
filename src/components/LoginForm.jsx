import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user data (including role) to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      navigate('/TicketsData');
     
    } catch (err) {
      setError(err.message || "Invalid email or password");
      console.error("Login error:", err);
    }
  };

  const handleRegister = () => {
    navigate("/EmployeeRegister");
  };

  return (
    <>
      <div className="header">
        <h1>Ticket Management</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login As Employee</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <div className="alignment-for-loginbutton">
            <h4> Don't have an account? </h4>
            <h4 className="underline" onClick={handleRegister}>
              Register
            </h4>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
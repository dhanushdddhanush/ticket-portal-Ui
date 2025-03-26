import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    password: "",

  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user/add", formData);
      alert("User added successfully!");
      navigate("/EmployeeData"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add user.");
    }
  };
  
  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
      <label>
          name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        
        <label>
          userName:
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
        </label>
        
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        
        <label>
          phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        
        <label>
          department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </label>
        
        <label>
          role:
          <input type="text" name="role" value={formData.role} onChange={handleChange} required />
        </label>
        
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default LoginForm;

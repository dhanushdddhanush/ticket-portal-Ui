import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
import "../App.css";
import Header from "./Header";

function RegisterForm() {
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
      // navigate("/EmployeeData"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add user.");
    }
  };
  const handleLogin=()=>{
    navigate("/EmployeeLogin");
  }
  
  return (
    <> 
     <div className="header">
         <h1>Ticket Management</h1>
         <button onClick={()=>handleHome()} >Home</button>
        </div>
    <div>
     
      <form className="register-form" onSubmit={handleSubmit}>

      <h2>Register As Employee</h2>
          <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
     
          <input type="text" name="userName" placeholder="Enter User Name" value={formData.userName} onChange={handleChange} required />
    
     
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
     
        
           <input type="tel" name="phone" placeholder="Enter Phone" value={formData.phone} onChange={handleChange} required />
     
        
          <input type="text" name="department"  placeholder="Enter Department" value={formData.department} onChange={handleChange} required />
     
        
          <input type="text" name="role" placeholder="Enter Role" value={formData.role} onChange={handleChange} required />
     
        
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
     
        
        <button type="submit">Register</button>
<div className="alignment-for-loginbutton">
        <h4>Already have an account? </h4> <h4 className="underline" onClick={()=>handleLogin()}>login</h4></div>
      </form>
    

      </div>
      
    </>
  );
}

export default RegisterForm;

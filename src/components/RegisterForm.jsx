import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
import "../App.css";


const RegisterForm=()=> {
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
      navigate("/"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add user.");
    }
  };
  const handleLogin=()=>{
    navigate("/");
  }
  const handleHome=()=>{
    navigate("/");
  }
  const handleRoleChange = (event) =>{
    const { value, checked } = event.target;
    if (checked) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            role: value
        }));
    }else{
        setFormData((prevFormData)=> ({
            ...prevFormData,
            role:""
        }));
    }
};
  
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
     
        
          {/* <input type="text" name="department"  placeholder="Enter Department" value={formData.department} onChange={handleChange} required />
      */}
         <select 
            name="department" 
            value={formData.department}
            onChange={handleChange} 
            required
          >
            <option value="">Select Department</option>
            <option value="Development">Development</option>
            <option value="Admin">Admin</option>
            <option value="Qa">Qa</option>
            
          
          </select>
          {/* <input type="text" name="role" placeholder="Enter Role" value={formData.role} onChange={handleChange} required />
      */}
      <div className="checkbox-container">
        <label>Select Role:
        </label>
            <input type="checkbox" name="role" value="Developer" checked={formData.role === "Developer"} onChange={handleRoleChange}/>
            <label htmlFor="Developer">Developer</label><br />
           
            <input type="checkbox" name="role" value="Tester" checked={formData.role === "Tester"} onChange={handleRoleChange}/>
            <label htmlFor="Tester">Tester</label><br />
            <input type="checkbox" name="role" value="Admin" checked={formData.role === "Admin"} onChange={handleRoleChange}/>
            <label htmlFor="Tester">Admin</label><br />
            
            </div>
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}  pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"title="Must be at least 8 characters, include 1 uppercase & 1 special character." required />
     
        
        <button type="submit">Register</button>
<div className="alignment-for-loginbutton">
        <h4>Already have an account? </h4> <h4 className="underline" onClick={()=>handleLogin()}>login</h4></div>
      </form>
    

      </div>
      
    </>
  );
}

export default RegisterForm;

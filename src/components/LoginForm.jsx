import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


const LoginForm =() => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });
  const[userData, setUserData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('http://localhost:8080/user')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = userData.find(
      (user) => user.email === formData.email && user.password === formData.password
    );
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/TicketsData');
    } else {
      alert('Invalid email or password');
    }
  };
  const handleRegister=()=>{
    navigate("/EmployeeRegister");
  }
  
   
  
  return (
    <> 
     <div className="header">
         <h1>Ticket Management</h1>
         <button onClick={()=>handleHome()} >Home</button>
        </div>
    <div>
      <form onSubmit={handleSubmit} >
      <h2>Login As Employee</h2>
     
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
     
        
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
     
        
        <button type="submit"> Login</button>
        <div className="alignment-for-loginbutton">
        <h4> Don't have an account? </h4> <h4 className="underline" onClick={()=>handleRegister()}>Register</h4></div>

      </form>
    </div>

    </>
  );
}

export default LoginForm;

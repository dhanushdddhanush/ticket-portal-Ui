import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
import "../App.css";
import Header from "./Header";

function TicketsForm() {
  const [formData, setFormData] = useState({
    ticket_title: "",
    ticket_description: "",
    ticket_priority: "",
    ticket_status: "",
    ticket_createdBy: "",
    ticket_assignedTo: "",
    ticket_comment: "",

  });
  const[fetchedData, setFetchedData] = useState([]);
  
  useEffect(() => {
      fetch('http://localhost:8080/user')
        .then((response) => response.json())
        .then((data) => setFetchedData(data));
    }, []);
  useEffect(() => {
      fetch('http://localhost:8080/user')
        .then((response) => response.json())
        .then((data) => setFetchedData(data));
    }, []);


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
      await axios.post("http://localhost:8080/tickets/add", formData);
      alert("Ticket added successfully!");
      navigate("/TicketDataAdd"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add ticket.");
    }
  };
  
  return (
    <> 
     <div className="header">
         <h1>Ticket Management</h1>
         <button onClick={()=>handleHome()} >Home</button>
        </div>
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
   
          <input type="text" name="ticket_title" placeholder="Enter Name" value={formData.ticket_title} onChange={handleChange} required />
          
          <textarea name="ticket_description" value={formData.ticket_description} onChange={handleChange} required
      placeholder="Enter Ticket Description"></textarea>

         <select name="ticket_priority" value={formData.ticket_priority} onChange={handleChange} required>
        
    </select>
    <select name="ticket_status" value={formData.ticket_status} onChange={handleChange} required>
        
        </select>

         <select name="ticket_createdBy" value={formData.ticket_createdBy} onChange={handleChange} required>
         <option value="select">Select Ticket Created By</option>
       {  fetchedData.map((user) => (
          <option key={user.user_id} value={user.user_id}>
            {user.name}
          </option>
        ))}
          
    </select>

         <select name="ticket_assignedTo" value={formData.ticket_assignedTo} onChange={handleChange} required>
         
         <option value="select">Select Ticket Assigned To</option>
       {  fetchedData.map((user) => (
          <option key={user.user_id} value={user.user_id}>
            {user.name}
          </option>
        ))}
    </select>
        
          
          
          <textarea name="ticket_comment" value={formData.ticket_comment} onChange={handleChange} required
      placeholder="Enter Ticket Comment"></textarea>
        
        
        <button type="submit">Add User</button>
      </form>
    </div>
    </>
  );
}

export default TicketsForm;

import React, { useState , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";  
import "../App.css";
import Header from "./Header";

function TicketsForm() {
  const { ticket_id } = useParams(); 
  const [formData, setFormData] = useState({
    ticket_title: "",
    ticket_description: "",
    ticket_priority: "",
    ticket_status: "",
    ticket_createdBy: "",
    ticket_assignedTo: "",
    ticket_comment: "",
  });
  const[userData, setUserData] = useState([]);
  const[statusData, setStatusData] = useState([]);
  const[priorityData, setPriorityData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/user')
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:8080/tickets/ticketpriority')
      .then((response) => response.json())
      .then((data) => setPriorityData(data));
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:8080/tickets/ticketstatus')
      .then((response) => response.json())
      .then((data) => setStatusData(data));
  }, []);

  
  useEffect(() => {
    if (ticket_id) {
      fetch(`http://localhost:8080/tickets/${ticket_id}`)
        .then(response => response.json())
        .then(data => {
          setFormData({
            ticket_title: data.ticket_title,
            ticket_description: data.ticket_description,
            ticket_priority: data.ticket_priority.ticketPriority_id,
            ticket_status: data.ticket_status.ticketStatus_id,
            ticket_createdBy: data.ticket_createdBy.user_id,
            ticket_assignedTo: data.ticket_assignedTo.user_id,
            ticket_comment: data.ticket_comment || "",
          });
        });
    }
  }, [ticket_id]);

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
      const payload = {
        ticket_title: formData.ticket_title,
        ticket_description: formData.ticket_description,
        ticket_createdBy: Number(formData.ticket_createdBy),
        ticketPriority_id: Number(formData.ticket_priority),
        ticket_assignedTo: Number(formData.ticket_assignedTo),
        ticketStatus_id: Number(formData.ticket_status),
        ticket_comment: formData.ticket_comment
      };

      if (ticket_id) {
       
        await axios.put(`http://localhost:8080/tickets/${ticket_id}`, payload);
        alert("Ticket updated successfully!");
      } else {
      
        await axios.post("http://localhost:8080/tickets/add", payload);
        alert("Ticket added successfully!");
      }
      
      navigate("/TicketsData"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save ticket. Error: " + (error.response?.data || error.message));
    }
  };
  
  return (
    <> 
      <Header/>
      <div>
        <form className="ticket-form" onSubmit={handleSubmit}>
          <h2>{ticket_id ? "Edit Ticket" : "Add Ticket"}</h2>
   
          <input type="text" name="ticket_title" placeholder="Enter Ticket Title" 
                 value={formData.ticket_title} onChange={handleChange} required />
          
          <textarea name="ticket_description" value={formData.ticket_description} 
                    onChange={handleChange} required placeholder="Enter Ticket Description">
          </textarea>

          <select name="ticket_priority" value={formData.ticket_priority} onChange={handleChange} required>
            <option value="">Select Ticket Priority</option>
            {priorityData.map((priority) => (
              <option key={priority.ticketPriority_id} value={priority.ticketPriority_id}>
                {priority.ticketPriority_description}
              </option>
            ))}
          </select>
          
          <select name="ticket_status" value={formData.ticket_status} onChange={handleChange} required>
            <option value="">Select Ticket Status</option>
            {statusData.map((status) => (
              <option key={status.ticketStatus_id} value={status.ticketStatus_id}>
                {status.ticketStatus_description}
              </option>
            ))}
          </select>

          <select name="ticket_createdBy" value={formData.ticket_createdBy} onChange={handleChange} required>
            <option value="">Select Ticket Created By</option>
            {userData.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </select>

          <select name="ticket_assignedTo" value={formData.ticket_assignedTo} onChange={handleChange} required>
            <option value="">Select Ticket Assigned To</option>
            {userData.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </select>
        
          <textarea name="ticket_comment" value={formData.ticket_comment} 
                    onChange={handleChange} placeholder="Enter Ticket Comment">
          </textarea>
        
          <button type="submit">{ticket_id ? "Update Ticket" : "Add Ticket"}</button>
        </form>
      </div>
    </>
  );
}

export default TicketsForm;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";  
import "../App.css";
import Header from "./Header";

const TicketsForm=() =>{
  const { ticket_id } = useParams(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(ticket_id ? true : false);

  const [formData, setFormData] = useState({
    ticket_title: "",
    ticket_description: "",
    ticket_priority: "",
    ticket_status: "",
    ticket_createdBy: "",
    ticket_assignedTo: "",
    ticket_comment: "",
  });

  const [userData, setUserData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:8080/user')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

 
  useEffect(() => {
    fetch('http://localhost:8080/tickets/ticketpriority')
      .then(response => response.json())
      .then(data => setPriorityData(data))
      .catch(error => console.error("Error fetching priorities:", error));
  }, []);

  
  useEffect(() => {
    fetch('http://localhost:8080/tickets/ticketstatus')
      .then(response => response.json())
      .then(data => setStatusData(data))
      .catch(error => console.error("Error fetching statuses:", error));
  }, []);

  
  useEffect(() => {
    if (ticket_id && userData.length > 0 && priorityData.length > 0 && statusData.length > 0) {
      setLoading(true);
      fetch(`http://localhost:8080/tickets/${ticket_id}`)
        .then(response => response.json())
        .then(data => {

          setFormData({
            ticket_title: data?.ticket_title || "",
            ticket_description: data?.ticket_description || "",
            ticket_priority: priorityData.find(p => p.ticketPriority_id === data?.ticket_priority?.ticketPriority_id)?.ticketPriority_id || "",
            ticket_status: statusData.find(s => s.ticketStatus_id === data?.ticket_status?.ticketStatus_id)?.ticketStatus_id || "",
            ticket_createdBy: userData.find(u => u.user_id === data?.ticket_createdBy?.user_id)?.user_id || "",
            ticket_assignedTo: userData.find(u => u.user_id === data?.ticket_assignedTo?.user_id)?.user_id || "",
            ticket_comment: data?.ticket_comment || "",
          });

          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching ticket details:", error);
          setLoading(false);
        });
    }
  }, [ticket_id, userData, priorityData, statusData]);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  if (loading) {
    return <p>Loading ticket details...</p>;
  }

  return (
    <> 
      <Header/>
      <div>
        <form className="ticket-form" onSubmit={handleSubmit}>
          <h2>{ticket_id ? "Edit Ticket" : "Add Ticket"}</h2>
   
          <input  type="text"  name="ticket_title"  placeholder="Enter Ticket Title"  value={formData.ticket_title}  onChange={handleChange}  required  />
          
          <textarea  name="ticket_description"  value={formData.ticket_description}  onChange={handleChange}  required  placeholder="Enter Ticket Description"/>
          
          <select  name="ticket_priority"  value={formData.ticket_priority}  onChange={handleChange} required>
            <option value="">Select Ticket Priority</option>
            {priorityData.map((priority) => (
              <option 
                key={priority.ticketPriority_id} 
                value={priority.ticketPriority_id}
              >
                {priority.ticketPriority_description}
              </option>
            ))}
          </select>
          
          <select  name="ticket_status"  value={formData.ticket_status}  onChange={handleChange}  required >
            <option value="">Select Ticket Status</option>
            {statusData.map((status) => (
              <option 
                key={status.ticketStatus_id} 
                value={status.ticketStatus_id}
              >
                {status.ticketStatus_description}
              </option>
            ))}
          </select>

          <select  name="ticket_createdBy"  value={formData.ticket_createdBy}  onChange={handleChange}  required>
            <option value="">Select Ticket Created By</option>
            {userData.map((user) => (
              <option 
                key={user.user_id} 
                value={user.user_id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <select name="ticket_assignedTo" value={formData.ticket_assignedTo}  onChange={handleChange} required>
            <option value="">Select Ticket Assigned To</option>
            {userData.map((user) => (
              <option 
                key={user.user_id} 
                value={user.user_id}
              >
                {user.name}
              </option>
            ))}
          </select>
        
          <textarea  name="ticket_comment"  value={formData.ticket_comment}  onChange={handleChange}  placeholder="Enter Ticket Comment"/>
        
          <button type="submit">
            {ticket_id ? "Update Ticket" : "Add Ticket"}
          </button>
        </form>
      </div>
    </>
  );
}

export default TicketsForm;

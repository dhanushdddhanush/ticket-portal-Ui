import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from 'axios';
import Header from './Header';

const TicketDataTable = () => {
  const [tickets, setTickets] = useState([]);  
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsAdmin(loggedInUser.roles?.some(role => role.role.toLowerCase() === 'admin'));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:8080/tickets')
        .then((response) => response.json())
        .then((data) => setTickets(data));
    }
  }, [user]);

  const handlAddTicket = () => {
    navigate("/TicketDataAdd");
  };
  const handleEditTicket = (ticket_id) => {
    navigate(`/TicketDataEdit/${ticket_id}`);
  };
  const handlViewEmployee = () => {
    navigate("/EmployeeData");
  };

 
  const getFilteredTickets = () => {
    let filtered = tickets;
    
    if (!isAdmin && user) {
      filtered = tickets.filter(ticket => 
        ticket.ticket_createdBy.name === user.name || 
        ticket.ticket_assignedTo.name === user.name
      );
    }
    
    
    if (search) {
      filtered = filtered.filter((ticket) =>
        ticket.ticket_title?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.ticket_priority.ticketPriority_description?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.ticket_status.ticketStatus_description?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.ticket_createdBy.name?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.ticket_assignedTo.name?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.ticket_comment?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return filtered;
  };

  const deleteTicket = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:8080/tickets/delete/${id}`);
      alert("Ticket deleted successfully!");
      setTickets(tickets.filter((ticket) => ticket.ticket_id !== id)); 
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket.");
    }
  };
  
  return (
    <>
      <Header/>
      <div className="datatable"> 
        
       <div className="addsearch">
       <div className="button-group2">
       <button className='buttonstyle' onClick={handlAddTicket}>Add Ticket +</button>
       {isAdmin && (
  <button className='buttonstyle' onClick={handlViewEmployee}>View Employees Data</button>
)} 
         
          </div>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Assigned To</th>
              {/* <th>Assigned Member Role</th> */}
              <th>Ticket Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTickets().map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>{ticket.ticket_id}</td>
                <td>{ticket.ticket_title}</td>
                <td>{ticket.ticket_description}</td>
                <td>{ticket.ticket_priority.ticketPriority_description}</td>
                <td>{ticket.ticket_status.ticketStatus_description}</td>
                <td>{ticket.ticket_createdBy.name}</td>
                <td>{ticket.ticket_createdDate}</td>
                <td>{ticket.ticket_assignedTo.name}</td>
                {/* <td>{ticket.ticket_assignedTo.roles?.map(role => role.role).join(', ')}</td> */}
                <td>{ticket.ticket_comment}</td>
                <td>
                  <button onClick={() => handleEditTicket(ticket.ticket_id)}>Edit</button>
                  <button onClick={() => deleteTicket(ticket.ticket_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </>
  );
};

export default TicketDataTable;
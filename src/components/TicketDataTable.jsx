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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false); // Toggle state

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      navigate('/login');
      return;
    }
    
    setUser(loggedInUser);
    setIsAdmin(loggedInUser.role?.toLowerCase() === 'admin');
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchTickets = async () => {
      try {
        const url = isAdmin 
          ? 'http://localhost:8080/tickets/admin/all-tickets'  
          : `http://localhost:8080/tickets/my-tickets/${user.userId}`;
        const response = await axios.get(url);
        
        setTickets(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, isAdmin]);

  const handleAddTicket = () => navigate("/TicketDataAdd");
  const handleEditTicket = (ticket_id) => navigate(`/TicketDataEdit/${ticket_id}`);
  const handleViewEmployee = () => navigate("/EmployeeData");

  const confirmDeleteTicket = (id) => {
    setTicketToDelete(id);
    setShowModal(true);
  };

  const deleteTicket = async () => {
    try {
      await axios.delete(`http://localhost:8080/tickets/delete/${ticketToDelete}`);
  
      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.ticket_id === ticketToDelete
            ? isAdmin
              ? { ...ticket, ticket_deleted: true } // Admin marks as deleted
              : null // User removes from state
            : ticket
        ).filter(ticket => ticket !== null) // Remove null entries (user deletions)
      );
  
      alert("Ticket deleted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete ticket");
    }
  
    setShowModal(false);
    setTicketToDelete(null);
  };

  if (loading) return <div className="datatable">Loading tickets...</div>;
  if (error) return <div className="datatable">Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="datatable"> 
        <h2>Hi, {user?.name} ({isAdmin ? "Admin" : user?.role})!</h2>

        <div className="addsearch">
          <div className="button-group2">
            <button className='buttonstyle' onClick={handleAddTicket}>Add Ticket +</button>
            {isAdmin && (
              <button className='buttonstyle' onClick={handleViewEmployee}>
                View Employees Data
              </button>
            )}
           {isAdmin && (
  <button className='buttonstyle' onClick={() => setShowDeleted(!showDeleted)}>
    {showDeleted ? "Show Active Tickets" : "Show Deleted Tickets"}
  </button>
)}
          </div>
          <input 
            type="search" 
            placeholder="Search..." 
            value={search} 
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
              <th>Comments</th>
              <th>Deleted?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets
              .filter(ticket => ticket.ticket_deleted === showDeleted) // Filter based on toggle
              .filter(ticket => 
                Object.values(ticket).some(
                  value => value && value.toString().toLowerCase().includes(search.toLowerCase())
                )
              )
              .map(ticket => (
                <tr key={ticket.ticket_id}>
                  <td>{ticket.ticket_id}</td>
                  <td>{ticket.ticket_title}</td>
                  <td>{ticket.ticket_description}</td>
                  <td>{ticket.ticket_priority?.ticketPriority_description}</td>
                  <td>{ticket.ticket_status?.ticketStatus_description}</td>
                  <td>{ticket.ticket_createdBy?.name}</td>
                  <td>{new Date(ticket.ticket_createdDate).toLocaleString()}</td>
                  <td>{ticket.ticket_assignedTo?.name}</td>
                  <td>{ticket.ticket_comment}</td>
                  <td>{ticket.ticket_deleted ? "Yes" : "No"}</td>
                  <td>
                    <div className="button-group">
                      {!ticket.ticket_deleted && (
                        <>
                          <button className='buttonstyle' onClick={() => handleEditTicket(ticket.ticket_id)}>Edit</button>
                          <button className='buttonstyle' onClick={() => confirmDeleteTicket(ticket.ticket_id)}>Delete</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={() => setShowModal(false)} className="close">&times;</span>
            <h1>Delete Ticket</h1>
            <p>Are you sure you want to delete this ticket?</p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)} className="cancelbtn">Cancel</button>
              <button onClick={deleteTicket} className="deletebtn">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketDataTable;

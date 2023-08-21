import React from 'react';
import './Ticket.css'; // Create a Ticket.css file for styling

function Ticket({ ticket }) {
  const { title, description, priority, status } = ticket;

  return (
    <div className="ticket">
      <h4 className="ticket-title">{title}</h4>
      <p className="ticket-description">{description}</p>
      <div className={`ticket-priority priority-${priority}`}>
        Priority: {priority === 4 ? 'Urgent' : priority === 3 ? 'High' : priority === 2 ? 'Medium' : priority === 1 ? 'Low' : 'No priority'}
      </div>
      <div className={`ticket-status status-${status}`}>Status: {status}</div>
    </div>
  );
}

export default Ticket;

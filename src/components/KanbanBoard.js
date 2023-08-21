import React, { useState, useEffect } from 'react';
import Ticket from './Ticket'; // Make sure you have a Ticket component
import './KanbanBoard.css';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [isDisplayOptionsVisible, setIsDisplayOptionsVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const groupedTickets = {};

  tickets.forEach(ticket => {
    const groupKey =
      groupingOption === 'user'
        ? ticket.assigned_to
        : groupingOption === 'priority'
        ? ticket.priority
        : ticket.status;
    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }
    groupedTickets[groupKey].push(ticket);
  });

  Object.keys(groupedTickets).forEach(groupKey => {
    groupedTickets[groupKey].sort((a, b) => {
      if (sortingOption === 'priority') {
        return b.priority - a.priority;
      } else if (sortingOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  return (
    <div className="kanban-board">
      <div className="display-container">
        <div className={`display-dropdown${isDisplayOptionsVisible ? ' active' : ''}`}>
          <button className={`display-button${isDisplayOptionsVisible ? ' active' : ''}`} onClick={() => setIsDisplayOptionsVisible(!isDisplayOptionsVisible)}>
            Display 
          </button>
          {isDisplayOptionsVisible && (
            <div className="options-box">
              <div className="options">
                <div className="grouping-option">
                  <label>Grouping  </label>
                  <select value={groupingOption} onChange={event => setGroupingOption(event.target.value)}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div className="ordering-option">
                  <label>Ordering  </label>
                  <select value={sortingOption} onChange={event => setSortingOption(event.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(groupKey => (
          <div key={groupKey} className="kanban-column">
            <h2>{groupKey}</h2>
            {groupedTickets[groupKey].map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;

import React from 'react';
import './index.css'; // You can add your custom styles here
import KanbanBoard from './components/KanbanBoard';

function App() {
  const mockTickets = [
    // Example ticket data
  ];

  return (
    <div className="app">
      <header className="app-header">
        {/* <h1>Kanban Board App</h1> */}
      </header>
      <main className="app-main">
        <KanbanBoard tickets={mockTickets} />
      </main>
      <footer className="app-footer">
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Overview from './pages/Overview';
import Players from './pages/Players';
import Matches from './pages/Matches';
import Agents from './pages/Agents';
import PlayerStats from './pages/PlayerStats';
import { useState } from 'react';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <h2 className="text-2xl font-bold mb-6">Valorant Dashboard</h2>
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-red-600">Overview</Link>
            <Link to="/players" className="text-gray-700 hover:text-red-600">Players</Link>
            <Link to="/matches" className="text-gray-700 hover:text-red-600">Matches</Link>
            <Link to="/agents" className="text-gray-700 hover:text-red-600">Agents</Link>
            <Link to="/player-stats" className="text-gray-700 hover:text-red-600">Player Stats</Link>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:pl-64">
          {/* Mobile top bar */}
          <div className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-700 focus:outline-none"
            >
              ☰
            </button>
            <h1 className="font-bold text-lg">Valorant Dashboard</h1>
          </div>

          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/players" element={<Players />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/player-stats" element={<PlayerStats />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/getAllReact';
import ChartWrapper from '../components/ChartWrapper';
import FilterDropdown from '../components/FilterDropdown';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Agents() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [selectedPlayer, setSelectedPlayer] = useState('All');
  const [selectedMap, setSelectedMap] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');

  useEffect(() => {
    fetchAllData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement données</p>;

  // Options filtres
  const playersList = ['All', ...data.players.map(p => p.player_name)];
  const mapsList = ['All', ...Array.from(new Set(data.player_stats.map(s => s.map)))];
  const agentsList = ['All', ...data.agents.map(a => a.agent_name)];
  const datesList = ['All', ...Array.from(new Set(data.matches.map(m => m.date)))];

  // Filtrer les stats
  let stats = data.player_stats;
  if (selectedPlayer !== 'All') stats = stats.filter(s => s.player_name === selectedPlayer);
  if (selectedMap !== 'All') stats = stats.filter(s => s.map === selectedMap);
  if (selectedAgent !== 'All') stats = stats.filter(s => s.agent_name === selectedAgent);
  if (selectedDate !== 'All') stats = stats.filter(s => s.created_at.startsWith(selectedDate));

  // Stats par agent
  const agentStats = data.agents.map(a => {
    const filteredStats = stats.filter(s => s.agent_id === a.agent_id);
    const kills = filteredStats.reduce((sum, s) => sum + s.kills, 0);
    return { name: a.agent_name, value: kills };
  });

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agents Dashboard</h1>

      <div className="flex gap-4 flex-wrap mb-6">
        <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />
        <FilterDropdown label="Map" options={mapsList} value={selectedMap} onChange={setSelectedMap} />
        <FilterDropdown label="Agent" options={agentsList} value={selectedAgent} onChange={setSelectedAgent} />
        <FilterDropdown label="Date" options={datesList} value={selectedDate} onChange={setSelectedDate} />
      </div>

      <ChartWrapper title="Kills par Agent">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={agentStats} dataKey="value" nameKey="name" label>
              {agentStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/getAllReact';
import FilterDropdown from '../components/FilterDropdown';
import ChartWrapper from '../components/ChartWrapper';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Players() {
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

  // Graphique kills / deaths / assists par match
  const killsByMatch = stats.map(s => ({
    match: s.match_id,
    kills: s.kills,
    deaths: s.deaths,
    assists: s.assists
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Players Dashboard</h1>

      <div className="flex gap-4 flex-wrap mb-6">
        <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />
        <FilterDropdown label="Map" options={mapsList} value={selectedMap} onChange={setSelectedMap} />
        <FilterDropdown label="Agent" options={agentsList} value={selectedAgent} onChange={setSelectedAgent} />
        <FilterDropdown label="Date" options={datesList} value={selectedDate} onChange={setSelectedDate} />
      </div>

      <ChartWrapper title="Kills / Deaths / Assists par match">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={killsByMatch}>
            <XAxis dataKey="match" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="kills" fill="#8884d8" />
            <Bar dataKey="deaths" fill="#82ca9d" />
            <Bar dataKey="assists" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  );
}

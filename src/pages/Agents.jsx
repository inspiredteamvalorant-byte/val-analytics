import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/supabaseFetch';
import ChartWrapper from '../components/ChartWrapper';
import FilterDropdown from '../components/FilterDropdown';

const Agents = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedPlayer, setSelectedPlayer] = useState('All');

  useEffect(() => {
    fetchAllData()
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement données</p>;

  const playersList = ['All', ...data.players.map(p => p.player_name)];

  let stats = data.player_stats;
  if (selectedPlayer !== 'All') stats = stats.filter(ps => ps.player_name === selectedPlayer);

  // Calcul pick rate et win rate par agent
  const agentStats = data.agents.map(a => {
    const agentGames = stats.filter(ps => ps.agent_id === a.agent_id);
    const pickRate = agentGames.length;
    const wins = agentGames.filter(ps => {
      const match = data.matches.find(m => m.match_id === ps.match_id);
      return match && match.result === 'win';
    }).length;
    const winRate = pickRate ? ((wins / pickRate) * 100).toFixed(2) : 0;
    return { name: a.agent_name, pickRate, winRate };
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agents Dashboard</h1>

      <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />

      <h2 className="mt-6 font-semibold">Pick Rate per Agent</h2>
      <ChartWrapper
        data={agentStats}
        dataKey="pickRate"
        nameKey="name"
        color="#8884d8"
      />

      <h2 className="mt-6 font-semibold">Win Rate per Agent (%)</h2>
      <ChartWrapper
        data={agentStats}
        dataKey="winRate"
        nameKey="name"
        color="#82ca9d"
      />
    </div>
  );
};

export default Agents;

import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/supabaseFetch';
import KPIBox from '../components/KPIBox';
import FilterDropdown from '../components/FilterDropdown';
import ChartWrapper from '../components/ChartWrapper';

const Players = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [selectedPlayer, setSelectedPlayer] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All');

  useEffect(() => {
    fetchAllData()
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement données</p>;

  // Liste unique des joueurs et agents pour les filtres
  const playersList = ['All', ...data.players.map(p => p.player_name)];
  const agentsList = ['All', ...data.agents.map(a => a.agent_name)];

  // Filtrage des stats
  let playerStats = data.player_stats;
  if (selectedPlayer !== 'All') playerStats = playerStats.filter(ps => ps.player_name === selectedPlayer);
  if (selectedAgent !== 'All') playerStats = playerStats.filter(ps => ps.agent_name === selectedAgent);

  // Calcul KPI par joueur
  const totalMatches = playerStats.length;
  const totalKills = playerStats.reduce((a,b) => a+b.kills,0);
  const totalDeaths = playerStats.reduce((a,b) => a+b.deaths,0);
  const totalAssists = playerStats.reduce((a,b) => a+b.assists,0);
  const avgKD = totalDeaths ? (totalKills/totalDeaths).toFixed(2) : 0;

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Players Dashboard</h1>

      {/* Filtres */}
      <div className="flex gap-4">
        <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />
        <FilterDropdown label="Agent" options={agentsList} value={selectedAgent} onChange={setSelectedAgent} />
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4">
        <KPIBox label="Total Matches" value={totalMatches} />
        <KPIBox label="Total Kills" value={totalKills} />
        <KPIBox label="Total Deaths" value={totalDeaths} />
        <KPIBox label="Average K/D" value={avgKD} />
      </div>

      {/* Graphique : K/D par joueur */}
      <ChartWrapper
        data={playerStats.map(ps => ({
          name: ps.player_name,
          kd: ps.deaths ? (ps.kills/ps.deaths).toFixed(2) : 0
        }))}
        dataKey="kd"
        nameKey="name"
        color="#82ca9d"
      />
    </div>
  );
};

export default Players;

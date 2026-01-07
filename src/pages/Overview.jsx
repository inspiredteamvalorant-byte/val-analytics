import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/getAllReact';
import KPIGrid from '../components/KPIGrid';
import ChartWrapper from '../components/ChartWrapper';
import FilterDropdown from '../components/FilterDropdown';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function Overview() {
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

  // Filtrer les stats selon les filtres
  let stats = data.player_stats;

  if (selectedPlayer !== 'All') stats = stats.filter(s => s.player_name === selectedPlayer);
  if (selectedMap !== 'All') stats = stats.filter(s => s.map === selectedMap);
  if (selectedAgent !== 'All') stats = stats.filter(s => s.agent_name === selectedAgent);
  if (selectedDate !== 'All') stats = stats.filter(s => s.created_at.startsWith(selectedDate));

  // KPI globaux
  const totalKills = stats.reduce((a,b)=>a+b.kills,0);
  const totalDeaths = stats.reduce((a,b)=>a+b.deaths,0);
  const totalAssists = stats.reduce((a,b)=>a+b.assists,0);
  const avgACS = stats.length ? (stats.reduce((a,b)=>a+b.acs,0)/stats.length).toFixed(1) : 0;

  const kpis = [
    { label: 'Total Kills', value: totalKills },
    { label: 'Total Deaths', value: totalDeaths },
    { label: 'Total Assists', value: totalAssists },
    { label: 'Average ACS', value: avgACS },
  ];

  // Données radar par joueur
  const radarData = data.players.map(p => {
    const ps = stats.filter(s => s.player_id === p.player_id);
    const kills = ps.reduce((a,b)=>a+b.kills,0);
    const deaths = ps.reduce((a,b)=>a+b.deaths,0);
    const assists = ps.reduce((a,b)=>a+b.assists,0);
    const kd = deaths ? (kills/deaths).toFixed(2) : 0;
    return { player: p.player_name, kills, deaths, assists, kd };
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Overview Dashboard</h1>

      <div className="flex gap-4 flex-wrap mb-6">
        <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />
        <FilterDropdown label="Map" options={mapsList} value={selectedMap} onChange={setSelectedMap} />
        <FilterDropdown label="Agent" options={agentsList} value={selectedAgent} onChange={setSelectedAgent} />
        <FilterDropdown label="Date" options={datesList} value={selectedDate} onChange={setSelectedDate} />
      </div>

      <KPIGrid kpis={kpis} />

      <h2 className="mt-6 font-semibold mb-4">Radar Stats</h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="player" />
          <PolarRadiusAxis />
          <Radar name="Kills" dataKey="kills" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
          <Radar name="Deaths" dataKey="deaths" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
          <Radar name="Assists" dataKey="assists" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
          <Radar name="K/D" dataKey="kd" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

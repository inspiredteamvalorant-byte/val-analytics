import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/getAllReact';
import KPIGrid from '../components/KPIGrid';
import ChartWrapper from '../components/ChartWrapper';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import FilterDropdown from '../components/FilterDropdown';

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState('All');

  useEffect(() => {
    fetchAllData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement données</p>;

  const playersList = ['All', ...data.players.map(p => p.player_name)];

  let stats = data.player_stats;
  if (selectedPlayer !== 'All') stats = stats.filter(ps => ps.player_name === selectedPlayer);

  // KPI globaux
  const totalKills = stats.reduce((a,b)=>a+b.kills,0);
  const totalDeaths = stats.reduce((a,b)=>a+b.deaths,0);
  const totalAssists = stats.reduce((a,b)=>a+b.assists,0);
  const avgACS = (stats.reduce((a,b)=>a+b.acs,0) / stats.length).toFixed(1);

  const kpis = [
    { label: 'Total Kills', value: totalKills },
    { label: 'Total Deaths', value: totalDeaths },
    { label: 'Total Assists', value: totalAssists },
    { label: 'Average ACS', value: avgACS },
  ];

  // Préparer données radar par joueur
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

      <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />

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

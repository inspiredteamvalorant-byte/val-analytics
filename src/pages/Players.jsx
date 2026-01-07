import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/getAllReact';
import FilterDropdown from '../components/FilterDropdown';
import ChartWrapper from '../components/ChartWrapper';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Players() {
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

  // Graphique kills par match
  const killsByMatch = stats.map(s => ({
    match: s.match_id,
    kills: s.kills,
    deaths: s.deaths,
    assists: s.assists
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Players Dashboard</h1>

      <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />

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

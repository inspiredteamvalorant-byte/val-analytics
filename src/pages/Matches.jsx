import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/supabaseFetch';
import FilterDropdown from '../components/FilterDropdown';

const Matches = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [selectedMap, setSelectedMap] = useState('All');
  const [selectedPlayer, setSelectedPlayer] = useState('All');

  useEffect(() => {
    fetchAllData()
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement données</p>;

  const matchesList = data.matches;
  const mapsList = ['All', ...new Set(matchesList.map(m => m.map))];
  const playersList = ['All', ...data.players.map(p => p.player_name)];

  // Filtrage
  let filteredMatches = matchesList;
  if (selectedMap !== 'All') filteredMatches = filteredMatches.filter(m => m.map === selectedMap);
  if (selectedPlayer !== 'All') filteredMatches = filteredMatches.filter(m =>
    data.player_stats.some(ps => ps.match_id === m.match_id && ps.player_name === selectedPlayer)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Matches Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <FilterDropdown label="Map" options={mapsList} value={selectedMap} onChange={setSelectedMap} />
        <FilterDropdown label="Player" options={playersList} value={selectedPlayer} onChange={setSelectedPlayer} />
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Map</th>
            <th className="border px-4 py-2">Opponent</th>
            <th className="border px-4 py-2">Result</th>
            <th className="border px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredMatches.map(m => (
            <tr key={m.match_id}>
              <td className="border px-4 py-2">{m.date}</td>
              <td className="border px-4 py-2">{m.map}</td>
              <td className="border px-4 py-2">{m.opponent}</td>
              <td className="border px-4 py-2">{m.result}</td>
              <td className="border px-4 py-2">{m.score || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Matches;

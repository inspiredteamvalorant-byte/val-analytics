import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/getAllReact';

export default function Matches() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement données</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Matches Dashboard</h1>
      <table className="min-w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Match ID</th>
            <th className="border p-2">Map</th>
            <th className="border p-2">BO</th>
            <th className="border p-2">Rounds</th>
            <th className="border p-2">Opponent</th>
          </tr>
        </thead>
        <tbody>
          {data.matches.map(match => (
            <tr key={match.match_id}>
              <td className="border p-2">{match.match_id}</td>
              <td className="border p-2">{match.map}</td>
              <td className="border p-2">{match.bo_type}</td>
              <td className="border p-2">{match.rounds_played || '-'}</td>
              <td className="border p-2">{match.opponent || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

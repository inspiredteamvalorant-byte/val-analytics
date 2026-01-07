import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/getAllReact';
import ChartWrapper from '../components/ChartWrapper';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Agents() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement données</p>;

  // Stats par agent
  const agentStats = data.agents.map(a => {
    const stats = data.player_stats.filter(ps => ps.agent_id === a.agent_id);
    const kills = stats.reduce((sum,s)=>sum+s.kills,0);
    return { name: a.agent_name, value: kills };
  });

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agents Dashboard</h1>

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

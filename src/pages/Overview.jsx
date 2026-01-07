import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/supabaseFetch';
import KPIGrid from '../components/KPIGrid';
import ChartWrapper from '../components/ChartWrapper';

export default function Overview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAllData().then(setData).catch(()=>setData(null));
  }, []);

  if (!data) return <p>Erreur API</p>;

  const totalKills = data.player_stats.reduce((a,b)=>a+b.kills,0);
  const totalDeaths = data.player_stats.reduce((a,b)=>a+b.deaths,0);

  const avgACS = (
    data.player_stats.reduce((a,b)=>a+Number(b.acs||0),0) /
    data.player_stats.length
  ).toFixed(0);

  const kdTeam = totalDeaths ? (totalKills/totalDeaths).toFixed(2) : 0;

  const kpis = [
    { label: "ACS Moyen", value: avgACS },
    { label: "K/D Équipe", value: kdTeam },
    { label: "Kills Totaux", value: totalKills },
    { label: "Maps Jouées", value: data.matches.length }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Team Overview</h1>

      <KPIGrid kpis={kpis} />

      <ChartWrapper title="Performance par map">
        <table className="w-full text-sm">
          {Object.groupBy(data.player_stats, x=>x.map)}
        </table>
      </ChartWrapper>
    </div>
  );
}

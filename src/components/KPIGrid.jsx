import KPIBox from './KPIBox';

export default function KPIGrid({ kpis }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {kpis.map((k,i)=>(
        <KPIBox key={i} label={k.label} value={k.value} />
      ))}
    </div>
  );
}

export default function KPIBox({ label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-3 border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

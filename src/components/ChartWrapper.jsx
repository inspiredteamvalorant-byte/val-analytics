export default function ChartWrapper({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border mb-4">
      {title && <h2 className="font-semibold text-lg mb-2">{title}</h2>}
      <div>{children}</div>
    </div>
  );
}

const KPIBox = ({ label, value, color="red" }) => {
  const colorClass = color === "red" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700";
  return (
    <div className={`shadow rounded-lg p-4 text-center ${colorClass}`}>
      <h3 className="text-sm">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default KPIBox;

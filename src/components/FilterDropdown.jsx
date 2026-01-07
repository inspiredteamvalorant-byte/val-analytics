export default function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="p-2 border rounded"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

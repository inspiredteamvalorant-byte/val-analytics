const FilterDropdown = ({ label, options, value, onChange }) => (
  <div className="flex flex-col mb-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      className="mt-1 border border-gray-300 rounded p-2"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;

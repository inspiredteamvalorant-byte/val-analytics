import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const LineChartWrapper = ({ data, dataKey, nameKey, color="#8884d8" }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey={nameKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke={color} />
    </LineChart>
  </ResponsiveContainer>
);

export const BarChartWrapper = ({ data, dataKey, nameKey, color="#82ca9d" }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey={nameKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} fill={color} />
    </BarChart>
  </ResponsiveContainer>
);

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SpendingTrendChartProps {
  data: { date: string; amount: number }[];
}

export const SpendingTrendChart = ({ data }: SpendingTrendChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="#F59E0B" 
          strokeWidth={2}
          name="Spending ($)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

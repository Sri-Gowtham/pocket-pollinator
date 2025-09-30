import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ExpenseChartProps {
  data: { category: string; amount: number }[];
}

const COLORS = ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A', '#FEF3C7'];

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry: any) => `${entry.category} ${(entry.percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
          nameKey="category"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

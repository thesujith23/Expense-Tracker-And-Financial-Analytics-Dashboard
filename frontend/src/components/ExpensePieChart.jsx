import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"]

const ExpensePieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ExpensePieChart
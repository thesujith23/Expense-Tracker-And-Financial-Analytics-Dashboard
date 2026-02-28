import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#22C55E", "#10B981", "#06B6D4", "#8B5CF6", "#F59E0B"]

const IncomePieChart = ({ data }) => {
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
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default IncomePieChart
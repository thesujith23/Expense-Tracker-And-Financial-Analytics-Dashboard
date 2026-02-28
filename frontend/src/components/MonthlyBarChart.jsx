import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const MonthlyBarChart = ({ data }) => {

  const formattedData = data.map(item => ({
    ...item,
    monthName: monthNames[item.month - 1]
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis
          dataKey="monthName"
          stroke="#ccc"
        />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar
          dataKey="total"
          fill="#3B82F6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MonthlyBarChart
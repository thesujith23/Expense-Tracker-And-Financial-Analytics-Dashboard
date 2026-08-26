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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1f35] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-slate-400 mb-0.5">{label}</p>
        <p className="text-emerald-400 font-bold">₹ {payload[0].value?.toLocaleString('en-IN')}</p>
      </div>
    )
  }
  return null
}

const MonthlyBarChart = ({ data }) => {

  const formattedData = data.map(item => ({
    ...item,
    monthName: monthNames[item.month - 1]
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formattedData} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="monthName"
          stroke="#475569"
          tick={{ fontSize: 11, fill: '#64748b' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          tickLine={false}
        />
        <YAxis
          stroke="#475569"
          tick={{ fontSize: 11, fill: '#64748b' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Bar
          dataKey="total"
          fill="url(#barGradient)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MonthlyBarChart
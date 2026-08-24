import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#34d399", "#22d3ee", "#818cf8", "#c084fc", "#fbbf24"]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1f35] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-emerald-400">₹ {payload[0].value?.toLocaleString('en-IN')}</p>
      </div>
    )
  }
  return null
}

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
          innerRadius={45}
          outerRadius={80}
          strokeWidth={0}
          label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
          labelLine={{ stroke: '#475569', strokeWidth: 1 }}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default IncomePieChart
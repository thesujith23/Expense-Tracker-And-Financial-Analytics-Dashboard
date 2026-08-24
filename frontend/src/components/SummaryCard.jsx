const SummaryCard = ({ title, value, icon, gradient, accent, borderColor }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} border ${borderColor} rounded-2xl p-5 transition-all hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <h2 className={`text-2xl font-extrabold ${accent} tracking-tight`}>
        ₹ {(value || 0).toLocaleString('en-IN')}
      </h2>
    </div>
  )
}

export default SummaryCard
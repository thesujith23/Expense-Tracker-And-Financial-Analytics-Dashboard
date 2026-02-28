const SummaryCard = ({ title, value, color }) => {
  return (
    <div className="bg-gray-900 p-3 lg:p-4 rounded-lg shadow-sm w-full border-l-4 shrink-0"
      style={{ borderColor: color }}>
      <h4 className="text-gray-400 text-xs">{title}</h4>
      <h2 className="text-lg lg:text-xl font-bold text-white mt-1">
        ₹ {value || 0}
      </h2>
    </div>
  )
}

export default SummaryCard
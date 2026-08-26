import API from '../services/api'
import { useEffect, useState } from "react"

const TransactionList = ({ transactions, refresh }) => {
  const [deletedIds, setDeletedIds] = useState(new Set())

  const handleDelete = async (id) => {
    // Optimistic UI hide
    setDeletedIds(prev => new Set(prev).add(id))
    try {
      await API.delete(`/transactions/${id}`)
      refresh()
    } catch (err) {
      console.error(err)
      setDeletedIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      alert("Failed to delete transaction")
    }
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm py-10">
        <span className="text-3xl mb-2">📭</span>
        <p>No recent transactions</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
      {transactions.filter(t => !deletedIds.has(t._id)).map(t => (
        <div key={t._id} className="flex items-center justify-between p-3 bg-[#0B0F1A] border border-white/[0.04] rounded-xl hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {t.type === 'income' ? '↓' : '↑'}
            </div>
            <div>
              <p className="text-sm font-bold text-white capitalize">{t.category}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                <span>{new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                {t.note && <span>• {t.note}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {t.type === 'income' ? '+' : '-'} ₹{t.amount.toLocaleString('en-IN')}
            </span>
            <button
              onClick={() => handleDelete(t._id)}
              className="w-7 h-7 rounded-md bg-white/[0.04] hover:bg-rose-500/20 hover:text-rose-400 text-slate-500 flex items-center justify-center transition-all"
              title="Delete"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList

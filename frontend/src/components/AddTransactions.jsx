import { useState } from "react"
import API from "../services/api"

const AddTransactions = ({ refresh }) => {
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [note, setNote] = useState("")

  const handleSubmit = async () => {
    if (!amount || !category || !date) {
      alert("Please fill in Amount, Category, and Date")
      return
    }
    try {
      await API.post("/transactions", {
        amount: Number(amount),
        type,
        category,
        date,
        note
      })

      alert("Transaction added")

      setAmount("")
      setCategory("")
      setDate(new Date().toISOString().split("T")[0])
      setNote("")

      refresh()

    } catch (error) {
      console.log("Transaction error:", error.response?.status, error.response?.data)
      alert("Failed to add: " + (error.response?.data?.msg || error.response?.data?.message || error.message))
    }
  }

  const inputClass = "w-full p-2.5 text-sm rounded-lg bg-[#0B0F1A] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"

  return (
    <div className="flex flex-col gap-3">
      <input
        className={inputClass}
        placeholder="Amount (₹)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className={inputClass}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        className={inputClass}
        placeholder="Category (e.g. Food, Salary)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="date"
        className={inputClass}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        className={inputClass}
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-1 py-2.5 text-sm font-bold rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-500/20"
      >
        + Add Transaction
      </button>
    </div>
  )
}

export default AddTransactions
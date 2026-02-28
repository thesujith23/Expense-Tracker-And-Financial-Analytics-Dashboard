import { useState } from "react"
import API from "../services/api"

const AddTransactions = ({ refresh }) => {
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = async () => {
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
      setDate("")
      setNote("")

      refresh() // refetch dashboard data

    } catch (error) {
      alert("Failed to add transaction")
    }
  }

  return (
    <div className="bg-gray-900 p-3 lg:p-4 rounded-lg shadow-sm flex-1 flex flex-col shrink-0 h-full">
      <h3 className="text-base font-semibold text-white mb-3 shrink-0">
        Add Transaction
      </h3>

      <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <input
          className="p-1.5 text-sm rounded bg-gray-800 text-white"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="p-1.5 text-sm rounded bg-gray-800 text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          className="p-1.5 text-sm rounded bg-gray-800 text-white"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          className="p-1.5 text-sm rounded bg-gray-800 text-white h-8"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="p-1.5 text-sm rounded bg-gray-800 text-white shrink-0"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 px-3 py-1.5 text-sm rounded hover:bg-blue-700 shrink-0"
      >
        Add
      </button>
    </div>
  )
}

export default AddTransactions
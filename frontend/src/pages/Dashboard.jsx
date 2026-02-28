import axios from "axios"
import API from '../services/api'
import { useEffect, useState } from "react"
import SummaryCard from "../components/SummaryCard"
import ExpensePieChart from "../components/ExpensePieChart"
import MonthlyBarChart from "../components/MonthlyBarChart"
import IncomePieChart from "../components/IncomePieChart"
import AddTransactions from "../components/AddTransactions"

export default function Dashboard() {
  const [summary, setSummary] = useState({})
  const [expense, setExpenseData] = useState([])
  const [income, setIncomeData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])

  const fetchData = async () => {
    const summaryRes = await API.get("/transactions/summary")
    const expenseRes = await API.get("/transactions/expense-summary")
    const incomeRes = await API.get("/transactions/income-summary")
    const monthlyRes = await API.get("/transactions/monthly-expense")

    setSummary(summaryRes.data)
    setExpenseData(expenseRes.data)
    setIncomeData(incomeRes.data)
    setMonthlyData(monthlyRes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">

      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800 shrink-0">
        <h1 className="text-lg font-bold">Finance Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }}
          className="bg-red-600 px-3 py-1.5 text-sm rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 lg:p-4 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-4 h-full">

          {/* Left Column: Summary & Add Transactions */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar">
            <div className="flex flex-col gap-3 shrink-0">
              <SummaryCard title="Total Income" value={summary.totalIncome} color="green" />
              <SummaryCard title="Total Expense" value={summary.totalExpense} color="red" />
              <SummaryCard title="Balance" value={summary.balance} color="blue" />
            </div>
            <div className="flex-1 min-h-0">
              <AddTransactions refresh={fetchData} />
            </div>
          </div>

          {/* Right Column: Charts */}
          <div className="lg:col-span-9 flex flex-col gap-4 h-full min-h-0">
            {/* Top Row: Pie Charts */}
            <div className="grid md:grid-cols-2 gap-4 h-1/2 min-h-[200px]">
              <div className="h-full bg-gray-900 rounded-lg shadow-sm p-3 flex flex-col">
                <h3 className="text-base font-semibold text-white mb-1 shrink-0">Expense Breakdown</h3>
                <div className="flex-1 min-h-0">
                  <ExpensePieChart data={expense} />
                </div>
              </div>
              <div className="h-full bg-gray-900 rounded-lg shadow-sm p-3 flex flex-col">
                <h3 className="text-base font-semibold text-white mb-1 shrink-0">Income Breakdown</h3>
                <div className="flex-1 min-h-0">
                  <IncomePieChart data={income} />
                </div>
              </div>
            </div>

            {/* Bottom Row: Bar Chart */}
            <div className="h-1/2 bg-gray-900 rounded-lg shadow-sm p-3 flex flex-col min-h-[200px]">
              <h3 className="text-base font-semibold text-white mb-1 shrink-0">Monthly Expense Trend</h3>
              <div className="flex-1 min-h-0">
                <MonthlyBarChart data={monthlyData} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
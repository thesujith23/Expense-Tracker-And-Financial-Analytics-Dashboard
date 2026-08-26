import API from '../services/api'
import { useEffect, useState } from "react"
import SummaryCard from "../components/SummaryCard"
import ExpensePieChart from "../components/ExpensePieChart"
import MonthlyBarChart from "../components/MonthlyBarChart"
import IncomePieChart from "../components/IncomePieChart"
import AddTransactions from "../components/AddTransactions"
import TransactionList from "../components/TransactionList"

export default function Dashboard() {
  const [summary, setSummary] = useState({})
  const [expense, setExpenseData] = useState([])
  const [income, setIncomeData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [transactions, setTransactions] = useState([])
  const [activeTab, setActiveTab] = useState('overview') // overview, analytics, add

  const fetchData = async () => {
    try {
      const summaryRes = await API.get("/transactions/summary")
      const expenseRes = await API.get("/transactions/expense-summary")
      const incomeRes = await API.get("/transactions/income-summary")
      const monthlyRes = await API.get("/transactions/monthly-expense")
      const txRes = await API.get("/transactions")

      setSummary(summaryRes.data)
      setExpenseData(expenseRes.data)
      setIncomeData(incomeRes.data)
      setMonthlyData(monthlyRes.data)
      setTransactions(txRes.data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-slate-200 font-sans flex flex-col">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center px-5 md:px-8 py-4 bg-[#0B0F1A]/90 backdrop-blur-xl border-b border-white/[0.06] gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-base shadow-lg shadow-emerald-500/20">
              💸
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-tight">FinanceFlow</h1>
              <p className="text-[10px] text-slate-500 font-medium">Analytics Dashboard</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              localStorage.removeItem("token")
              window.location.href = "/login"
            }}
            className="md:hidden text-slate-400 text-xs font-medium px-3 py-1.5 rounded-md border border-white/[0.06] hover:bg-white/[0.04]"
          >
            Logout
          </button>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center gap-2 bg-[#111827] p-1.5 rounded-xl border border-white/[0.04]">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon="📊" label="Overview" />
          <TabButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon="📈" label="Analytics" />
          <TabButton active={activeTab === 'add'} onClick={() => setActiveTab('add')} icon="➕" label="Add New" />
        </div>

        {/* Desktop Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }}
          className="hidden md:block text-slate-400 text-sm font-medium px-4 py-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] hover:text-white transition-all"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1400px] w-full mx-auto mb-20 md:mb-0">
        
        {/* Always visible: Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard title="Total Income" value={summary.totalIncome} icon="📈" gradient="from-emerald-500/10 to-emerald-500/5" accent="text-emerald-400" borderColor="border-emerald-500/20" />
          <SummaryCard title="Total Expense" value={summary.totalExpense} icon="📉" gradient="from-rose-500/10 to-rose-500/5" accent="text-rose-400" borderColor="border-rose-500/20" />
          <SummaryCard title="Balance" value={summary.balance} icon="💰" gradient="from-emerald-500/10 to-emerald-500/5" accent="text-emerald-400" borderColor="border-emerald-500/20" />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-6 shadow-xl shadow-black/20 flex flex-col min-h-[400px]">
              <div className="flex items-center gap-2 mb-6 shrink-0">
                <span className="text-base">📅</span>
                <h3 className="text-sm font-bold text-white">Monthly Expense Trend</h3>
              </div>
              <div className="flex-1 min-h-0 relative">
                {monthlyData.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">No data available</div>
                ) : <MonthlyBarChart data={monthlyData} />}
              </div>
            </div>
            <div className="bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-6 shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 mb-6 shrink-0">
                <span className="text-base">📜</span>
                <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
              </div>
              <TransactionList transactions={transactions} refresh={fetchData} />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-6 flex flex-col min-h-[400px] shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 mb-4 shrink-0">
                <span className="text-base">🔴</span>
                <h3 className="text-sm font-bold text-white">Expense Breakdown</h3>
              </div>
              <div className="flex-1 min-h-0 relative">
                {expense.length === 0 ? <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">No data</div> : <ExpensePieChart data={expense} />}
              </div>
            </div>
            <div className="bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-6 flex flex-col min-h-[400px] shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 mb-4 shrink-0">
                <span className="text-base">🟢</span>
                <h3 className="text-sm font-bold text-white">Income Breakdown</h3>
              </div>
              <div className="flex-1 min-h-0 relative">
                {income.length === 0 ? <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">No data</div> : <IncomePieChart data={income} />}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-md mx-auto bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-xl shadow-black/20">
            <div className="flex items-center gap-2 mb-6 text-center justify-center">
              <span className="text-2xl">✏️</span>
              <h3 className="text-xl font-bold text-white">Add Transaction</h3>
            </div>
            <AddTransactions refresh={() => { fetchData(); setActiveTab('overview'); }} />
          </div>
        )}
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0B0F1A]/95 backdrop-blur-2xl border-t border-white/[0.06] flex items-center justify-around p-2 z-50">
        <MobileTabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon="📊" label="Overview" />
        <MobileTabButton active={activeTab === 'add'} onClick={() => setActiveTab('add')} icon="➕" label="Add New" />
        <MobileTabButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon="📈" label="Analytics" />
      </div>

    </div>
  )
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
        active 
        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)] border border-emerald-500/30' 
        : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  )
}

function MobileTabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
        active 
        ? 'text-emerald-400' 
        : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <span className={`text-xl mb-1 ${active ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''}`}>{icon}</span>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  )
}
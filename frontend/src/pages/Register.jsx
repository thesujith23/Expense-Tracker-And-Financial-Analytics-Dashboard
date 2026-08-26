import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../services/api'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await API.post("/auth/register", {
                name,
                email,
                password
            })
            alert("Registration Successful, please login")
            navigate("/login")
        } catch (err) {
            console.log(err)
            alert("Registration Failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white p-4 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none will-change-transform transform-gpu"></div>
            
            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 mb-5 shadow-lg shadow-teal-500/20">
                        <span className="text-2xl">🎉</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Create Account</h2>
                    <p className="text-sm text-slate-500">Join FinanceFlow to manage your expenses</p>
                </div>

                <div className="bg-[#111827]/60 border border-white/[0.06] rounded-2xl p-8">
                    <form className="space-y-5" onSubmit={handleRegister}>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                className="w-full p-3 bg-[#0B0F1A] border border-white/[0.08] rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                                placeholder="John Doe"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                className="w-full p-3 bg-[#0B0F1A] border border-white/[0.08] rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                                placeholder="you@example.com"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="w-full p-3 bg-[#0B0F1A] border border-white/[0.08] rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                                placeholder="••••••••"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-teal-500/20 hover:opacity-90 hover:-translate-y-0.5 transition-all"
                        >
                            Create Account →
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6 text-sm text-slate-500 font-medium">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}
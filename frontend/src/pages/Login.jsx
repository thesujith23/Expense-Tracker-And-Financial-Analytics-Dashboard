import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../services/api'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            })
            localStorage.setItem("token", res.data.token)
            // Use navigate instead of window.location for smoother SPA transition
            window.location.href = "/"
        } catch (err) {
            console.log(err)
            alert("Login Failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back</h2>
                    <p className="text-sm text-gray-400 mt-2">Sign in to your Finance Dashboard</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                        Register now
                    </Link>
                </div>
            </div>
        </div>
    )
}
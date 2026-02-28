import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      })

      alert("Registration successful. Please login.")
      navigate("/login")

    } catch (error) {
      alert(error.response?.data?.msg || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"></div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Create an Account</h2>
          <p className="text-sm text-gray-400 mt-2">Start tracking your expenses today</p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">Full Name</label>
            <input
              id="name"
              className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
              type="password"
              className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-teal-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
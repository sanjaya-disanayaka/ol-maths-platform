import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      console.log('Login response:', data)

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      // Save user + JWT through AuthContext
      login(data.user, data.token)

      setMessage('Login successful!')

    } catch (error) {
      console.error('Login error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-md">

        <h1 className="text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-slate-400">
          Login to continue learning O/L Mathematics.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p className="rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {message}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login
import { useState } from 'react'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed')
        return
      }

      console.log(data)

      setMessage('Account created successfully!')

      // Clear form
      setName('')
      setEmail('')
      setPassword('')

    } catch (error) {
      console.error('Registration error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-md">

        <h1 className="text-4xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-slate-400">
          Create your student account and start learning.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Success Message */}
          {message && (
            <p className="rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {message}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default Register
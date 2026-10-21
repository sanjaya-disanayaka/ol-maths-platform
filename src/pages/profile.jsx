import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        <p className="text-red-400">
          You are not logged in.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-md">

        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">

          <h2 className="text-2xl font-semibold">
            {user.name}
          </h2>

          <p className="mt-2 text-slate-400">
            {user.email}
          </p>

          <button
            onClick={logout}
            className="mt-6 w-full rounded-lg bg-red-600 py-3 font-semibold hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  )
}

export default Profile
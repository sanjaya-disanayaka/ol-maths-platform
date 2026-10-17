import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="text-xl font-bold text-white">
          O/L Maths
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-slate-300 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="text-slate-300 hover:text-white"
          >
            Courses
          </Link>

          <Link
            to="/login"
            className="text-slate-300 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Register
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            O/L Mathematics
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Learn Mathematics.
            <br />
            Build Your Future.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Master O/L Mathematics with structured lessons,
            practice questions, quizzes and progress tracking.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
              Start Learning
            </button>

            <button className="rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-900">
              View Courses
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Home
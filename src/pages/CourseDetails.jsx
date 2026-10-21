import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CourseDetails() {
  const { courseName } = useParams()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/courses/${courseName}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch course')
        }

        setCourse(data.course)
      } catch (error) {
        console.error('Course error:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseName])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Loading course...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Course not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          O/L Mathematics
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          {course.title}
        </h1>

        <p className="mt-4 text-slate-400">
          {course.description}
        </p>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Course Lessons
            </h2>

            <span className="text-sm text-slate-500">
              {course.lessons.length} Lessons
            </span>
          </div>

          <div className="mt-6 space-y-4">

            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-5"
              >
                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 font-bold text-blue-400">
                    {lesson.order}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {lesson.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {lesson.content}
                    </p>
                  </div>

                </div>

                <button
                  className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
                >
                  Start Lesson
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
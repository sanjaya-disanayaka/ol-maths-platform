import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Courses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5001/api/courses'
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch courses')
                }

                setCourses(data.courses)
            } catch (error) {
                console.error('Courses error:', error)
                setError('Failed to load courses')
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 p-10 text-center text-white">
                <p className="text-lg">Loading courses...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 p-10 text-center text-white">
                <p className="text-red-400">{error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                        O/L Mathematics
                    </p>

                    <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                        Choose Your Course
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                        Learn important O/L Mathematics topics through structured
                        lessons, examples and practice questions.
                    </p>
                </div>

                {/* Courses */}
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500"
                        >

                            {/* Course Icon */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-xl font-bold text-blue-400">
                                {course.title.charAt(0)}
                            </div>

                            {/* Title */}
                            <h2 className="mt-5 text-2xl font-semibold">
                                {course.title}
                            </h2>

                            {/* Description */}
                            <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                                {course.description}
                            </p>

                            {/* Bottom */}
                            <div className="mt-5 flex items-center justify-between">

                                <span className="text-sm text-slate-500">
                                    {course.lessons.length} Lessons
                                </span>

                                <button
                                    onClick={() =>
                                        navigate(`/courses/${course.id}`)
                                    }
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
                                >
                                    Start Course
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Courses
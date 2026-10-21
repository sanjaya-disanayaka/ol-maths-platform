import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/profile'
import CourseDetails from './pages/CourseDetails'

import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/courses" element={<Courses />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/:courseName"
            element={<CourseDetails />}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
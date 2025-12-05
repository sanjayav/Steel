import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard1 from './pages/Dashboard1'
import Dashboard2 from './pages/Dashboard2'
import Dashboard3 from './pages/Dashboard3'
import Dashboard4 from './pages/Dashboard4'
import Dashboard5 from './pages/Dashboard5'
import Dashboard6 from './pages/Dashboard6'
import Dashboard7 from './pages/Dashboard7'
import Dashboard8 from './pages/Dashboard8'
import Dashboard9 from './pages/Dashboard9'
import GreenSteelPassport from './pages/GreenSteelPassport'
import TechnicalData from './pages/TechnicalData'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } />

        <Route path="/*" element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard1 />} />
                <Route path="/traceability" element={<Dashboard2 />} />
                <Route path="/carbon" element={<Dashboard3 />} />
                <Route path="/circularity" element={<Dashboard4 />} />
                <Route path="/durability" element={<Dashboard5 />} />
                <Route path="/end-of-life" element={<Dashboard6 />} />
                <Route path="/data-quality" element={<Dashboard7 />} />
                <Route path="/documents" element={<Dashboard8 />} />
                <Route path="/commercial" element={<Dashboard9 />} />
                <Route path="/passport" element={<GreenSteelPassport />} />
                <Route path="/technical" element={<TechnicalData />} />
              </Routes>
            </Layout>
          )
        } />
      </Routes>
    </Router>
  )
}

export default App


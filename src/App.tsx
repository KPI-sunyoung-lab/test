import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import AdminPage from './components/AdminPage'
import { initMixpanel, trackPageView } from './utils/mixpanel'

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  // Mixpanel 초기화
  useEffect(() => {
    const token = import.meta.env.VITE_MIXPANEL_TOKEN
    if (token) {
      initMixpanel(token)
    } else {
      console.warn('Mixpanel token is not set. Please add VITE_MIXPANEL_TOKEN to your .env file')
    }
  }, [])

  // 페이지뷰 추적
  useEffect(() => {
    const pageName = location.pathname === '/' ? 'Dashboard' : location.pathname.slice(1)
    trackPageView(pageName, {
      path: location.pathname,
    })
  }, [location])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} currentPath={location.pathname} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App


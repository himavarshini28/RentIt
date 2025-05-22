import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import LoginPage from './pages/LoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import UserDashboardPage from './pages/UserDashboardPage'
import SignupPage from './pages/SignupPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import useUserStore from './store/userStore'
import Allproperties from './pages/Allproperties'



// Protected route component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, checkAuth, isLoading } = useUserStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated]);

  if (isLoading) {
    // You could return a loading spinner here
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
   const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return (

      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route 
              path="/user/dashboard" 
              element={<ProtectedRoute element={<UserDashboardPage />} />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={<ProtectedRoute element={<AdminDashboardPage />} />} 
            />
            <Route path="/property" element={<Allproperties />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
  )
}

export default App

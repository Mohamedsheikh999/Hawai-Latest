import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import StudentDashboard from './pages/Student';
//import AdminDashboard from './pages/Admin';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Layout from './components/Layout';
import AdminDashboard from './components/Dashboard/AdminDashboard';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/student" element={<Layout><StudentDashboard /></Layout>} />
             <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
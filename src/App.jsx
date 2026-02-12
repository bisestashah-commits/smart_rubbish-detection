import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/ProjectRoute';
import Login from './pages/Login';
import Register from './pages/Regiester';
import Dashboard from './pages/Dashboard';
import HeatMap from './pages/HeatMap';
import ReportRubish from './pages/ReportRubish';
import Leaderboard from './pages/Leaderboard';
import Awareness from './pages/Awareness';
import { useContext } from 'react';

const RootRedirect = () => {
  const { user } = useContext(AuthContext);
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/heatmap"
            element={
              <ProtectedRoute>
                <HeatMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportRubish />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/awareness"
            element={
              <ProtectedRoute>
                <Awareness />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<RootRedirect />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

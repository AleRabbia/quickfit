import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/user/Dashboard';
import WorkoutPlan from './components/user/WorkoutPlan';
import NutritionPlan from './components/user/NutritionPlan';
import Progress from './components/user/Progress';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageRoutines from './components/admin/ManageRoutines';
import { useAuth } from './context/AuthContext';

// Componente para proteger rutas
function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workout" element={<WorkoutPlan />} />
            <Route path="nutrition" element={<NutritionPlan />} />
            <Route path="progress" element={<Progress />} />
            
            {/* Rutas de admin */}
            <Route path="admin" element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="admin/users" element={
              <PrivateRoute adminOnly={true}>
                <ManageUsers />
              </PrivateRoute>
            } />
            <Route path="admin/routines" element={
              <PrivateRoute adminOnly={true}>
                <ManageRoutines />
              </PrivateRoute>
            } />
          </Route>
          
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
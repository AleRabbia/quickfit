import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { initializeReminders } from "./services/reminderService";
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/user/Dashboard";
import WorkoutPlan from "./components/user/WorkoutPlan";
import NutritionPlan from "./components/user/NutritionPlan";
import Progress from "./components/user/Progress";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageUsers from "./components/admin/ManageUsers";
import ManageRoutines from "./components/admin/ManageRoutines";
import { useAuth } from "./context/AuthContext";
import Settings from "./components/settings/Settings";
import CreateWorkoutPlan from "./components/user/CreateWorkoutPlan";
import NutritionWizard from "./components/user/NutritionWizard";

function NutritionCreatePage() {
  const navigate = useNavigate();

  const handleComplete = (formData) => {
    console.log("Plan nutricional creado:", formData);
    navigate("/nutrition");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-5xl mx-auto">
        <NutritionWizard
          onClose={() => navigate("/nutrition")}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}

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

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  useEffect(() => {
    // Inicializar recordatorios al cargar la app
    initializeReminders();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="workout" element={<WorkoutPlan />} />
              <Route path="nutrition" element={<NutritionPlan />} />
              <Route
                path="nutrition/create"
                element={<NutritionCreatePage />}
              />
              <Route path="progress" element={<Progress />} />
              <Route path="settings" element={<Settings />} />
              <Route path="workout/create" element={<CreateWorkoutPlan />} />

              {/* Rutas de admin */}
              <Route
                path="admin"
                element={
                  <PrivateRoute adminOnly={true}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="admin/users"
                element={
                  <PrivateRoute adminOnly={true}>
                    <ManageUsers />
                  </PrivateRoute>
                }
              />
              <Route
                path="admin/routines"
                element={
                  <PrivateRoute adminOnly={true}>
                    <ManageRoutines />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

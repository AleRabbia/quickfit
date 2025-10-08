import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Dumbbell, Apple, TrendingUp, Settings } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 text-2xl font-bold">
            <Dumbbell className="w-8 h-8" />
            <span>QuickFit</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-indigo-200 transition flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/workout" className="hover:text-indigo-200 transition flex items-center gap-2">
              <Dumbbell className="w-5 h-5" />
              <span>Entrenamiento</span>
            </Link>
            <Link to="/nutrition" className="hover:text-indigo-200 transition flex items-center gap-2">
              <Apple className="w-5 h-5" />
              <span>Nutrición</span>
            </Link>
            <Link to="/progress" className="hover:text-indigo-200 transition flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Progreso</span>
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-indigo-200 transition flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-sm">
              Hola, <span className="font-semibold">{user?.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:block">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
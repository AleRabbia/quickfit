import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Apple, TrendingUp, Calendar, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    workoutsCompleted: 0,
    currentStreak: 0,
    totalMinutes: 0,
    caloriesBurned: 0,
  });

  useEffect(() => {
    // Aquí cargarías las estadísticas desde la API
    // Por ahora usamos datos de ejemplo
    setStats({
      workoutsCompleted: 12,
      currentStreak: 5,
      totalMinutes: 180,
      caloriesBurned: 1850,
    });
  }, []);

  const dailyTip = "Recuerda mantener una buena hidratación durante y después de tu entrenamiento. Bebe al menos 500ml de agua después de cada sesión.";

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user?.name}! 👋</h1>
        <p className="text-indigo-100">
          Estás haciendo un gran trabajo. ¡Sigue así!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Workouts Completed */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Dumbbell className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.workoutsCompleted}</span>
          </div>
          <p className="text-gray-600 text-sm">Entrenamientos completados</p>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.currentStreak}</span>
          </div>
          <p className="text-gray-600 text-sm">Días consecutivos</p>
        </div>

        {/* Total Minutes */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.totalMinutes}</span>
          </div>
          <p className="text-gray-600 text-sm">Minutos totales</p>
        </div>

        {/* Calories Burned */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.caloriesBurned}</span>
          </div>
          <p className="text-gray-600 text-sm">Calorías quemadas</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/workout" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition group">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-4 rounded-lg group-hover:bg-indigo-200 transition">
              <Dumbbell className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Entrenamiento de Hoy</h3>
              <p className="text-sm text-gray-600">Ver tu rutina HIIT</p>
            </div>
          </div>
        </Link>

        <Link to="/nutrition" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition group">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg group-hover:bg-green-200 transition">
              <Apple className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Plan Nutricional</h3>
              <p className="text-sm text-gray-600">Ver tu dieta</p>
            </div>
          </div>
        </Link>

        <Link to="/progress" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition group">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-4 rounded-lg group-hover:bg-purple-200 transition">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Ver Progreso</h3>
              <p className="text-sm text-gray-600">Analiza tu evolución</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Daily Tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">💡 Consejo del día</h3>
            <p className="text-amber-800">{dailyTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import { Link } from 'react-router-dom';
import { Users, Dumbbell, TrendingUp, Settings } from 'lucide-react';

function AdminDashboard() {
  const stats = {
    totalUsers: 45,
    activeUsers: 32,
    totalRoutines: 15,
    avgWorkoutsPerWeek: 4.2,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-indigo-100">Gestiona usuarios, rutinas y contenido de QuickFit</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.totalUsers}</span>
          </div>
          <p className="text-gray-600 text-sm">Total Usuarios</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.activeUsers}</span>
          </div>
          <p className="text-gray-600 text-sm">Usuarios Activos</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Dumbbell className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.totalRoutines}</span>
          </div>
          <p className="text-gray-600 text-sm">Rutinas Disponibles</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.avgWorkoutsPerWeek}</span>
          </div>
          <p className="text-gray-600 text-sm">Prom. Entrenamientos/Semana</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/users"
          className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-4 rounded-lg group-hover:bg-blue-200 transition">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Gestionar Usuarios</h3>
          <p className="text-gray-600">Ver, editar y administrar todos los usuarios registrados</p>
        </Link>

        <Link
          to="/admin/routines"
          className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-4 rounded-lg group-hover:bg-purple-200 transition">
              <Dumbbell className="w-8 h-8 text-purple-600" />
            </div>
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Gestionar Rutinas</h3>
          <p className="text-gray-600">Crear, editar y eliminar rutinas de entrenamiento</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="bg-green-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Nuevo usuario registrado</p>
              <p className="text-sm text-gray-500">Maria González - hace 2 horas</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Dumbbell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Rutina completada</p>
              <p className="text-sm text-gray-500">Juan Pérez - HIIT Intenso - hace 3 horas</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Progreso registrado</p>
              <p className="text-sm text-gray-500">Carlos López - Peso: -2kg - hace 5 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
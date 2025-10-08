import { useState, useEffect } from 'react';
import { getAllRoutines, createRoutine, deleteWorkout } from '../../services/api';
import { Plus, Trash2, Edit, Clock, Flame } from 'lucide-react';

function ManageRoutines() {
  const [routines, setRoutines] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    name: '',
    duration: '',
    calories: '',
    difficulty: 'intermediate',
    exercises: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      // const data = await getAllRoutines();
      // setRoutines(data);
      
      // Datos de ejemplo
      setRoutines([
        {
          id: 1,
          name: 'HIIT Intenso',
          duration: 15,
          calories: 180,
          difficulty: 'advanced',
          exercises: 4,
          timesCompleted: 156,
        },
        {
          id: 2,
          name: 'Cardio & Core',
          duration: 12,
          calories: 150,
          difficulty: 'intermediate',
          exercises: 4,
          timesCompleted: 203,
        },
        {
          id: 3,
          name: 'Fuerza Upper Body',
          duration: 15,
          calories: 160,
          difficulty: 'intermediate',
          exercises: 4,
          timesCompleted: 145,
        },
        {
          id: 4,
          name: 'HIIT Piernas',
          duration: 15,
          calories: 190,
          difficulty: 'advanced',
          exercises: 4,
          timesCompleted: 178,
        },
        {
          id: 5,
          name: 'Flexibilidad & Movilidad',
          duration: 10,
          calories: 80,
          difficulty: 'beginner',
          exercises: 6,
          timesCompleted: 89,
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading routines:', error);
      setLoading(false);
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    if (window.confirm('¿Estás seguro de eliminar esta rutina?')) {
      try {
        // await deleteWorkout(routineId);
        setRoutines(routines.filter(r => r.id !== routineId));
      } catch (error) {
        console.error('Error deleting routine:', error);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Cargando rutinas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestionar Rutinas</h1>
          <p className="text-gray-600">Crea y administra las rutinas de entrenamiento</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Rutina</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-indigo-600 mb-1">{routines.length}</div>
          <div className="text-sm text-gray-600">Rutinas Totales</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {routines.filter(r => r.difficulty === 'beginner').length}
          </div>
          <div className="text-sm text-gray-600">Principiante</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-yellow-600 mb-1">
            {routines.filter(r => r.difficulty === 'intermediate').length}
          </div>
          <div className="text-sm text-gray-600">Intermedio</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-red-600 mb-1">
            {routines.filter(r => r.difficulty === 'advanced').length}
          </div>
          <div className="text-sm text-gray-600">Avanzado</div>
        </div>
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <div key={routine.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{routine.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(routine.difficulty)}`}>
                  {getDifficultyLabel(routine.difficulty)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{routine.duration} minutos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Flame className="w-5 h-5" />
                  <span>{routine.calories} kcal</span>
                </div>
                <div className="text-sm text-gray-600">
                  {routine.exercises} ejercicios
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-4">
                  Completado {routine.timesCompleted} veces
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-indigo-100 text-indigo-600 py-2 rounded-lg hover:bg-indigo-200 transition flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteRoutine(routine.id)}
                    className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Routine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Rutina</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la rutina
                </label>
                <input
                  type="text"
                  value={newRoutine.name}
                  onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Ej: HIIT Intenso"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración (minutos)
                  </label>
                  <input
                    type="number"
                    value={newRoutine.duration}
                    onChange={(e) => setNewRoutine({ ...newRoutine, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="15"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calorías estimadas
                  </label>
                  <input
                    type="number"
                    value={newRoutine.calories}
                    onChange={(e) => setNewRoutine({ ...newRoutine, calories: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="180"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dificultad
                </label>
                <select
                  value={newRoutine.difficulty}
                  onChange={(e) => setNewRoutine({ ...newRoutine, difficulty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    // Aquí irá la lógica para crear la rutina
                    console.log('Nueva rutina:', newRoutine);
                    setShowAddModal(false);
                    setNewRoutine({
                      name: '',
                      duration: '',
                      calories: '',
                      difficulty: 'intermediate',
                      exercises: [],
                    });
                  }}
                >
                  Crear Rutina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRoutines;
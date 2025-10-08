import { useState, useEffect } from 'react';
import { getProgress, addProgress } from '../../services/api';
import { TrendingUp, Weight, Calendar, Plus } from 'lucide-react';

function Progress() {
  const [progressData, setProgressData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProgress, setNewProgress] = useState({
    weight: '',
    waist: '',
    chest: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      // const data = await getProgress();
      // setProgressData(data);
      
      // Datos de ejemplo
      setProgressData([
        { id: 1, date: '2024-10-01', weight: 75, waist: 85, chest: 95, workouts: 3 },
        { id: 2, date: '2024-10-08', weight: 74.5, waist: 84, chest: 96, workouts: 4 },
        { id: 3, date: '2024-10-15', weight: 74, waist: 83, chest: 96.5, workouts: 5 },
        { id: 4, date: '2024-10-22', weight: 73.5, waist: 82, chest: 97, workouts: 5 },
        { id: 5, date: '2024-10-29', weight: 73, waist: 81.5, chest: 97.5, workouts: 4 },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading progress:', error);
      setLoading(false);
    }
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();
    try {
      // await addProgress(newProgress);
      // await loadProgress();
      
      // Simulación
      const newEntry = {
        id: progressData.length + 1,
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newProgress.weight),
        waist: parseFloat(newProgress.waist),
        chest: parseFloat(newProgress.chest),
        workouts: 0,
      };
      setProgressData([...progressData, newEntry]);
      
      setShowAddModal(false);
      setNewProgress({ weight: '', waist: '', chest: '', notes: '' });
    } catch (error) {
      console.error('Error adding progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Cargando progreso...</div>
      </div>
    );
  }

  const latestData = progressData[progressData.length - 1];
  const firstData = progressData[0];

  const weightChange = latestData && firstData ? (latestData.weight - firstData.weight).toFixed(1) : 0;
  const waistChange = latestData && firstData ? (latestData.waist - firstData.waist).toFixed(1) : 0;
  const chestChange = latestData && firstData ? (latestData.chest - firstData.chest).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Progreso</h1>
          <p className="text-gray-600">Sigue tu evolución semana a semana</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Datos</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Weight className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{latestData?.weight || 0} kg</div>
              <div className="text-sm text-gray-600">Peso actual</div>
            </div>
          </div>
          <div className={`text-sm font-medium ${weightChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {weightChange > 0 ? '+' : ''}{weightChange} kg desde el inicio
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{latestData?.waist || 0} cm</div>
              <div className="text-sm text-gray-600">Cintura</div>
            </div>
          </div>
          <div className={`text-sm font-medium ${waistChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {waistChange > 0 ? '+' : ''}{waistChange} cm desde el inicio
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{latestData?.chest || 0} cm</div>
              <div className="text-sm text-gray-600">Pecho</div>
            </div>
          </div>
          <div className={`text-sm font-medium ${chestChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {chestChange > 0 ? '+' : ''}{chestChange} cm desde el inicio
          </div>
        </div>
      </div>

      {/* Progress Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Historial de mediciones
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Peso (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cintura (cm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pecho (cm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entrenamientos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {progressData.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {new Date(entry.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {entry.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{entry.waist}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{entry.chest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{entry.workouts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Progress Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Agregar Medición</h2>
            <form onSubmit={handleAddProgress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newProgress.weight}
                  onChange={(e) => setNewProgress({ ...newProgress, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cintura (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newProgress.waist}
                  onChange={(e) => setNewProgress({ ...newProgress, waist: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pecho (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newProgress.chest}
                  onChange={(e) => setNewProgress({ ...newProgress, chest: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas (opcional)</label>
                <textarea
                  value={newProgress.notes}
                  onChange={(e) => setNewProgress({ ...newProgress, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  rows="3"
                />
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
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Progress;
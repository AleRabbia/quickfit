import { useState } from 'react';
import { TrendingUp, TrendingDown, Weight, Calendar, Plus, Target, Award, X } from 'lucide-react';

function Progress() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProgress, setNewProgress] = useState({
    weight: '',
    waist: '',
    chest: '',
    notes: '',
  });

  const progressData = [
    { id: 1, date: '2024-10-01', weight: 75, waist: 85, chest: 95, workouts: 3 },
    { id: 2, date: '2024-10-08', weight: 74.5, waist: 84, chest: 96, workouts: 4 },
    { id: 3, date: '2024-10-15', weight: 74, waist: 83, chest: 96.5, workouts: 5 },
    { id: 4, date: '2024-10-22', weight: 73.5, waist: 82, chest: 97, workouts: 5 },
    { id: 5, date: '2024-10-29', weight: 73, waist: 81.5, chest: 97.5, workouts: 4 },
    { id: 6, date: '2024-11-05', weight: 72.5, waist: 81, chest: 98, workouts: 5 },
  ];

  const latestData = progressData[progressData.length - 1];
  const firstData = progressData[0];

  const weightChange = (latestData.weight - firstData.weight).toFixed(1);
  const waistChange = (latestData.waist - firstData.waist).toFixed(1);
  const chestChange = (latestData.chest - firstData.chest).toFixed(1);

  const maxWeight = Math.max(...progressData.map(d => d.weight));
  const minWeight = Math.min(...progressData.map(d => d.weight));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New progress:', newProgress);
    setShowAddModal(false);
    setNewProgress({ weight: '', waist: '', chest: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Tu Progreso</h1>
              <p className="text-gray-600">Seguimiento de tu evolución semanal</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar Datos</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
                <Weight className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-600 mb-1">Peso Actual</div>
                <div className="text-4xl font-bold text-gray-800">{latestData.weight} kg</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${weightChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {weightChange < 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              <span>{Math.abs(weightChange)} kg desde el inicio</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2">Últimas 6 semanas</div>
              <div className="flex items-end gap-1 h-16">
                {progressData.map((data, index) => {
                  const height = ((data.weight - minWeight) / (maxWeight - minWeight)) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-600 mb-1">Cintura</div>
                <div className="text-4xl font-bold text-gray-800">{latestData.waist} cm</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${waistChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {waistChange < 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              <span>{Math.abs(waistChange)} cm desde el inicio</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2">Últimas 6 semanas</div>
              <div className="flex items-end gap-1 h-16">
                {progressData.map((data, index) => {
                  const maxWaist = Math.max(...progressData.map(d => d.waist));
                  const minWaist = Math.min(...progressData.map(d => d.waist));
                  const height = ((data.waist - minWaist) / (maxWaist - minWaist)) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-600 mb-1">Pecho</div>
                <div className="text-4xl font-bold text-gray-800">{latestData.chest} cm</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${chestChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {chestChange > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span>{Math.abs(chestChange)} cm desde el inicio</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2">Últimas 6 semanas</div>
              <div className="flex items-end gap-1 h-16">
                {progressData.map((data, index) => {
                  const maxChest = Math.max(...progressData.map(d => d.chest));
                  const minChest = Math.min(...progressData.map(d => d.chest));
                  const height = ((data.chest - minChest) / (maxChest - minChest)) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-green-500 to-emerald-500 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-purple-600" />
            Historial Detallado
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Peso</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Cintura</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Pecho</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Entrenamientos</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Cambio</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((entry, index) => {
                  const prevEntry = index > 0 ? progressData[index - 1] : null;
                  const weightDiff = prevEntry ? (entry.weight - prevEntry.weight).toFixed(1) : 0;
                  
                  return (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Calendar className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-800">
                            {new Date(entry.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="font-bold text-gray-800 text-lg">{entry.weight} kg</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="font-bold text-gray-800">{entry.waist} cm</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="font-bold text-gray-800">{entry.chest} cm</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {entry.workouts} ✓
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        {prevEntry && (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                            weightDiff < 0 ? 'bg-green-100 text-green-700' : weightDiff > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {weightDiff < 0 ? <TrendingDown className="w-4 h-4" /> : weightDiff > 0 ? <TrendingUp className="w-4 h-4" /> : '—'}
                            {weightDiff !== 0 && `${Math.abs(weightDiff)} kg`}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Logros</h3>
                <p className="text-gray-600">¡Sigue así!</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <div className="font-semibold text-gray-800">-2.5 kg en 6 semanas</div>
                  <div className="text-sm text-gray-600">¡Excelente progreso!</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                <span className="text-3xl">📉</span>
                <div>
                  <div className="font-semibold text-gray-800">-4 cm de cintura</div>
                  <div className="text-sm text-gray-600">Reducción constante</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                <span className="text-3xl">💪</span>
                <div>
                  <div className="font-semibold text-gray-800">+3 cm de pecho</div>
                  <div className="text-sm text-gray-600">Ganancia muscular</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Mes</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Peso perdido</span>
                  <span className="text-2xl font-bold text-green-600">-2.5 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full" style={{ width: '83%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">83% de tu objetivo mensual</div>
              </div>

              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Entrenamientos</span>
                  <span className="text-2xl font-bold text-purple-600">26</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '87%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">87% de asistencia este mes</div>
              </div>

              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Calorías quemadas</span>
                  <span className="text-2xl font-bold text-orange-600">4680</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full" style={{ width: '93%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">¡Superaste tu meta!</div>
              </div>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Nueva Medición</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newProgress.weight}
                    onChange={(e) => setNewProgress({ ...newProgress, weight: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition"
                    placeholder="72.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cintura (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newProgress.waist}
                    onChange={(e) => setNewProgress({ ...newProgress, waist: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition"
                    placeholder="81"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pecho (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newProgress.chest}
                    onChange={(e) => setNewProgress({ ...newProgress, chest: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition"
                    placeholder="98"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas (opcional)
                  </label>
                  <textarea
                    value={newProgress.notes}
                    onChange={(e) => setNewProgress({ ...newProgress, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition resize-none"
                    rows="3"
                    placeholder="¿Cómo te sientes?"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Progress;
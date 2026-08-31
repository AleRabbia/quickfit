import { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Clock, Calendar, X } from 'lucide-react';
import { getReminders, saveReminder, deleteReminder, updateReminder } from '../../services/reminderService';

function ReminderSettings() {
  const [reminders, setReminders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'workout',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    enabled: true,
  });

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = () => {
    const savedReminders = getReminders();
    setReminders(savedReminders);
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    
    const reminderDateTime = new Date(`${newReminder.date}T${newReminder.time}`);
    
    saveReminder({
      ...newReminder,
      date: reminderDateTime.toISOString(),
    });
    
    loadReminders();
    setShowAddModal(false);
    setNewReminder({
      type: 'workout',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      enabled: true,
    });
  };

  const handleDeleteReminder = (reminderId) => {
    deleteReminder(reminderId);
    loadReminders();
  };

  const handleToggleReminder = (reminderId, currentState) => {
    updateReminder(reminderId, { enabled: !currentState });
    loadReminders();
  };

  const getReminderIcon = (type) => {
    switch(type) {
      case 'workout': return '🏋️';
      case 'meal': return '🍽️';
      default: return '⏰';
    }
  };

  const getReminderColor = (type) => {
    switch(type) {
      case 'workout': return 'from-purple-500 to-pink-500';
      case 'meal': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Recordatorios
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus recordatorios de entrenamientos y comidas
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Recordatorio</span>
        </button>
      </div>

      {/* Lista de recordatorios */}
      {reminders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 ${
                reminder.enabled 
                  ? 'border-gray-200 dark:border-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-br ${getReminderColor(reminder.type)} p-3 rounded-xl shadow-lg`}>
                    <span className="text-2xl">{getReminderIcon(reminder.type)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">
                      {reminder.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {reminder.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleReminder(reminder.id, reminder.enabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    reminder.enabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      reminder.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(reminder.date).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{reminder.time}</span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteReminder(reminder.id)}
                className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            No tienes recordatorios
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Crea recordatorios para no olvidar tus entrenamientos y comidas
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            Crear Primer Recordatorio
          </button>
        </div>
      )}

      {/* Modal para agregar recordatorio */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Nuevo Recordatorio
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tipo
                </label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl focus:border-purple-500 outline-none transition"
                  required
                >
                  <option value="workout">🏋️ Entrenamiento</option>
                  <option value="meal">🍽️ Comida</option>
                  <option value="other">⏰ Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl focus:border-purple-500 outline-none transition"
                  placeholder="Ej: HIIT Intenso"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl focus:border-purple-500 outline-none transition resize-none"
                  rows="3"
                  placeholder="Detalles del recordatorio..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl focus:border-purple-500 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl focus:border-purple-500 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReminderSettings;
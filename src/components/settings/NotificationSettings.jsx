import { useState, useEffect } from 'react';
import { Bell, BellOff, Check, X } from 'lucide-react';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  sendNotification,
} from '../../services/notificationService';

function NotificationSettings() {
  const [permission, setPermission] = useState('default');
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);
  const [achievementNotifications, setAchievementNotifications] = useState(true);

  useEffect(() => {
    setPermission(getNotificationPermission());
    
    // Cargar preferencias guardadas
    const savedPreferences = localStorage.getItem('notification_preferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setWorkoutReminders(preferences.workoutReminders ?? true);
      setMealReminders(preferences.mealReminders ?? true);
      setAchievementNotifications(preferences.achievementNotifications ?? true);
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      const granted = await requestNotificationPermission();
      if (granted) {
        setPermission('granted');
        sendNotification('¡Notificaciones activadas!', {
          body: 'Recibirás recordatorios y actualizaciones de QuickFit',
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleTestNotification = () => {
    sendNotification('🧪 Notificación de Prueba', {
      body: 'Si ves esto, las notificaciones están funcionando correctamente',
    });
  };

  const savePreferences = (preferences) => {
    localStorage.setItem('notification_preferences', JSON.stringify(preferences));
  };

  const handleWorkoutToggle = () => {
    const newValue = !workoutReminders;
    setWorkoutReminders(newValue);
    savePreferences({ workoutReminders: newValue, mealReminders, achievementNotifications });
  };

  const handleMealToggle = () => {
    const newValue = !mealReminders;
    setMealReminders(newValue);
    savePreferences({ workoutReminders, mealReminders: newValue, achievementNotifications });
  };

  const handleAchievementToggle = () => {
    const newValue = !achievementNotifications;
    setAchievementNotifications(newValue);
    savePreferences({ workoutReminders, mealReminders, achievementNotifications: newValue });
  };

  if (!isNotificationSupported()) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <BellOff className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              Notificaciones no soportadas
            </h3>
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              Tu navegador no soporta notificaciones push. Considera actualizar tu navegador o usar uno diferente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estado de permisos */}
      <div className={`rounded-2xl p-6 border-2 ${
        permission === 'granted'
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
          : permission === 'denied'
          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${
            permission === 'granted'
              ? 'bg-green-100 dark:bg-green-800'
              : permission === 'denied'
              ? 'bg-red-100 dark:bg-red-800'
              : 'bg-blue-100 dark:bg-blue-800'
          }`}>
            {permission === 'granted' ? (
              <Check className="w-6 h-6 text-green-600 dark:text-green-300" />
            ) : permission === 'denied' ? (
              <X className="w-6 h-6 text-red-600 dark:text-red-300" />
            ) : (
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`font-bold mb-2 ${
              permission === 'granted'
                ? 'text-green-900 dark:text-green-100'
                : permission === 'denied'
                ? 'text-red-900 dark:text-red-100'
                : 'text-blue-900 dark:text-blue-100'
            }`}>
              {permission === 'granted' && 'Notificaciones Activadas'}
              {permission === 'denied' && 'Notificaciones Bloqueadas'}
              {permission === 'default' && 'Activa las Notificaciones'}
            </h3>
            <p className={`text-sm mb-4 ${
              permission === 'granted'
                ? 'text-green-800 dark:text-green-200'
                : permission === 'denied'
                ? 'text-red-800 dark:text-red-200'
                : 'text-blue-800 dark:text-blue-200'
            }`}>
              {permission === 'granted' && 'Recibirás recordatorios y actualizaciones importantes.'}
              {permission === 'denied' && 'Has bloqueado las notificaciones. Debes habilitarlas desde la configuración del navegador.'}
              {permission === 'default' && 'Recibe recordatorios de entrenamientos, comidas y logros desbloqueados.'}
            </p>
            <div className="flex gap-3">
              {permission === 'default' && (
                <button
                  onClick={handleEnableNotifications}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition"
                >
                  Activar Notificaciones
                </button>
              )}
              {permission === 'granted' && (
                <button
                  onClick={handleTestNotification}
                  className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Probar Notificación
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preferencias de notificaciones */}
      {permission === 'granted' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Preferencias de Notificaciones
          </h3>
          
          <div className="space-y-4">
            {/* Recordatorios de entrenamiento */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                  <span className="text-2xl">🏋️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">
                    Recordatorios de Entrenamiento
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Recibe recordatorios antes de tus entrenamientos
                  </div>
                </div>
              </div>
              <button
                onClick={handleWorkoutToggle}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  workoutReminders ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    workoutReminders ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Recordatorios de comidas */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">
                    Recordatorios de Comidas
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Recibe recordatorios para tus comidas del día
                  </div>
                </div>
              </div>
              <button
                onClick={handleMealToggle}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  mealReminders ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    mealReminders ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notificaciones de logros */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-lg">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">
                    Notificaciones de Logros
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Recibe notificaciones cuando desbloquees logros
                  </div>
                </div>
              </div>
              <button
                onClick={handleAchievementToggle}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  achievementNotifications ? 'bg-yellow-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    achievementNotifications ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationSettings;
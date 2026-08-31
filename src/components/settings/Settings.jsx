import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Clock, Palette, Share2 } from 'lucide-react';
import NotificationSettings from './NotificationSettings';
import ReminderSettings from './ReminderSettings';

function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'reminders', label: 'Recordatorios', icon: Clock },
    { id: 'appearance', label: 'Apariencia', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                Configuración
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Personaliza tu experiencia en QuickFit
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'reminders' && <ReminderSettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de configuración de apariencia
function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Tema de la Aplicación
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          El modo oscuro ya está disponible. Usa el interruptor en la barra de navegación para cambiar entre temas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview Modo Claro */}
        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="text-sm font-semibold mb-2">☀️ Modo Claro</div>
          </div>
          <div className="bg-white p-6">
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="h-4 bg-purple-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 text-center">
            <span className="text-sm text-gray-600">Diseño limpio y claro</span>
          </div>
        </div>

        {/* Preview Modo Oscuro */}
        <div className="border-2 border-purple-500 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 text-white">
            <div className="text-sm font-semibold mb-2">🌙 Modo Oscuro</div>
          </div>
          <div className="bg-gray-900 p-6">
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="bg-purple-900/50 rounded-lg p-3">
                <div className="h-4 bg-purple-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 text-center">
            <span className="text-sm text-gray-400">Reduce fatiga visual</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Consejo
        </h4>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          El modo oscuro puede ayudar a reducir la fatiga visual, especialmente durante entrenamientos nocturnos o en ambientes con poca luz.
        </p>
      </div>
    </div>
  );
}

export default Settings;
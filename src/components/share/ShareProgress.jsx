import { useState } from 'react';
import { Share2, Download, Image as ImageIcon } from 'lucide-react';
import ShareButton from './ShareButton';
import { generateProgressImage } from '../../services/shareService';

function ShareProgress({ progressData }) {
  const [generating, setGenerating] = useState(false);

  const generateImageCard = async () => {
    setGenerating(true);
    
    // Simular generación de imagen
    setTimeout(() => {
      setGenerating(false);
      alert('¡Imagen generada! En una implementación real, esto descargaría una imagen PNG.');
    }, 2000);
  };

  const { weightChange, waistChange, chestChange, totalDays, workoutsCompleted } = progressData;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-200 dark:border-purple-700">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          🎉 ¡Comparte tu Progreso!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Inspira a otros con tu transformación
        </p>
      </div>

      {/* Preview Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border-2 border-purple-200 dark:border-purple-700">
        <div className="text-center mb-4">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Mi Progreso en QuickFit
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {weightChange !== 0 && (
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {Math.abs(weightChange)}kg
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {weightChange < 0 ? '📉 Perdidos' : '📈 Ganados'}
              </div>
            </div>
          )}

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {totalDays}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              📅 Días
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {workoutsCompleted}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              💪 Entrenamientos
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          #QuickFit #Fitness #Transformacion
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShareButton
          title="Mira mi progreso en QuickFit"
          text={generateProgressImage({
            weightChange,
            days: totalDays,
            caloriesBurned: workoutsCompleted * 180
          })}
          url={window.location.origin}
          variant="button"
        />

        <button
          onClick={generateImageCard}
          disabled={generating}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Generando...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              <span>Generar Imagen</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Comparte tu progreso en redes sociales y motiva a otros a unirse a QuickFit
        </p>
      </div>
    </div>
  );
}

export default ShareProgress;
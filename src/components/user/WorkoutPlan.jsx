import { useState, useEffect } from 'react';
import { getWorkouts } from '../../services/api';
import { Clock, Flame, Play, CheckCircle, Calendar } from 'lucide-react';

function WorkoutPlan() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      // const data = await getWorkouts();
      // setWorkouts(data);
      
      // Datos de ejemplo mientras no tengamos backend
      setWorkouts([
        {
          id: 1,
          day: 'Lunes',
          name: 'HIIT Intenso',
          duration: 15,
          calories: 180,
          exercises: [
            { name: 'Burpees', duration: '45seg', rest: '15seg' },
            { name: 'Mountain Climbers', duration: '45seg', rest: '15seg' },
            { name: 'Jump Squats', duration: '45seg', rest: '15seg' },
            { name: 'High Knees', duration: '45seg', rest: '15seg' },
          ],
          completed: false,
        },
        {
          id: 2,
          day: 'Martes',
          name: 'Cardio & Core',
          duration: 12,
          calories: 150,
          exercises: [
            { name: 'Jumping Jacks', duration: '60seg', rest: '20seg' },
            { name: 'Plancha', duration: '45seg', rest: '15seg' },
            { name: 'Bicycle Crunches', duration: '45seg', rest: '15seg' },
            { name: 'Russian Twists', duration: '45seg', rest: '15seg' },
          ],
          completed: false,
        },
        {
          id: 3,
          day: 'Miércoles',
          name: 'Fuerza Upper Body',
          duration: 15,
          calories: 160,
          exercises: [
            { name: 'Push-ups', duration: '45seg', rest: '15seg' },
            { name: 'Tricep Dips', duration: '45seg', rest: '15seg' },
            { name: 'Pike Push-ups', duration: '45seg', rest: '15seg' },
            { name: 'Plank to Down Dog', duration: '45seg', rest: '15seg' },
          ],
          completed: false,
        },
        {
          id: 4,
          day: 'Jueves',
          name: 'HIIT Piernas',
          duration: 15,
          calories: 190,
          exercises: [
            { name: 'Squat Jumps', duration: '45seg', rest: '15seg' },
            { name: 'Lunges alternados', duration: '45seg', rest: '15seg' },
            { name: 'Wall Sit', duration: '45seg', rest: '15seg' },
            { name: 'Calf Raises', duration: '45seg', rest: '15seg' },
          ],
          completed: false,
        },
        {
          id: 5,
          day: 'Viernes',
          name: 'Full Body HIIT',
          duration: 15,
          calories: 200,
          exercises: [
            { name: 'Burpees', duration: '45seg', rest: '15seg' },
            { name: 'Mountain Climbers', duration: '45seg', rest: '15seg' },
            { name: 'Push-ups', duration: '45seg', rest: '15seg' },
            { name: 'Jump Squats', duration: '45seg', rest: '15seg' },
          ],
          completed: false,
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading workouts:', error);
      setLoading(false);
    }
  };

  const todayWorkout = workouts.find(w => w.day === selectedDay);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Cargando entrenamientos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Plan de Entrenamiento</h1>
        <p className="text-gray-600">Entrenamientos HIIT personalizados de 10-15 minutos</p>
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">Selecciona el día</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Workout Details */}
      {todayWorkout ? (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Workout Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">{todayWorkout.name}</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{todayWorkout.duration} minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                <span>{todayWorkout.calories} kcal</span>
              </div>
            </div>
          </div>

          {/* Exercises List */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Ejercicios</h3>
            <div className="space-y-4">
              {todayWorkout.exercises.map((exercise, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{exercise.name}</h4>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>⏱️ Trabajo: {exercise.duration}</span>
                      <span>💤 Descanso: {exercise.rest}</span>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>

            {/* Start Workout Button */}
            <button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              <span>Comenzar Entrenamiento</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <p className="text-gray-600 text-lg">No hay entrenamiento programado para este día</p>
          <p className="text-gray-500 mt-2">Día de descanso 😴</p>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Consejos para tu entrenamiento HIIT</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Calienta 2-3 minutos antes de empezar</li>
          <li>• Mantén una buena técnica en cada ejercicio</li>
          <li>• Respeta los tiempos de descanso</li>
          <li>• Hidrátate durante y después del entrenamiento</li>
        </ul>
      </div>
    </div>
  );
}

export default WorkoutPlan;
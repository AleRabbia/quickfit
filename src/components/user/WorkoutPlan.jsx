/*import { useState, useEffect } from 'react';
import { Sparkles ,Play, Pause, RotateCcw, Clock, Flame, Calendar, CheckCircle2, X } from 'lucide-react';
import WorkoutWizard from './WorkoutWizard';

function WorkoutPlan() {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isResting, setIsResting] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    // 🎵 Generador de sonidos simple con Web Audio API
  const playBeep = (frequency = 800, duration = 0.2) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);

    // Atenuar volumen
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  };

  const workouts = {
  'Lunes': {
    name: 'Cardio + Piernas',
    duration: 10,
    calories: 120,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Jumping Jacks', duration: 40, rest: 20, image: '⚡' },
      { name: 'Sentadillas', duration: 40, rest: 20, image: '🦵' },
      { name: 'Burpees', duration: 40, rest: 20, image: '🔥' },
      { name: 'Zancadas alternas', duration: 40, rest: 20, image: '🏃' },
      { name: 'Mountain Climbers', duration: 40, rest: 20, image: '⛰️' },
    ],
  },
  'Martes': {
    name: 'Core + Cardio',
    duration: 10,
    calories: 110,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Plancha con toque de hombros', duration: 40, rest: 20, image: '🤸' },
      { name: 'Bicicleta en el aire', duration: 40, rest: 20, image: '🚴' },
      { name: 'High Knees', duration: 40, rest: 20, image: '🔥' },
      { name: 'Plancha con rodilla al codo', duration: 40, rest: 20, image: '🧘' },
      { name: 'Saltos de tijera', duration: 40, rest: 20, image: '⚡' },
    ],
  },
  'Miércoles': {
    name: 'Piernas + Glúteos',
    duration: 10,
    calories: 120,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Sentadillas con salto', duration: 40, rest: 20, image: '🦵' },
      { name: 'Puente de glúteos', duration: 40, rest: 20, image: '🍑' },
      { name: 'Zancadas con salto', duration: 40, rest: 20, image: '🏋️' },
      { name: 'Patada de glúteo', duration: 40, rest: 20, image: '🐾' },
      { name: 'Step touch lateral', duration: 40, rest: 20, image: '🎵' },
    ],
  },
  'Jueves': {
    name: 'Full Body',
    duration: 10,
    calories: 130,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Burpees', duration: 40, rest: 20, image: '🔥' },
      { name: 'Sentadilla + Press imaginario', duration: 40, rest: 20, image: '💪' },
      { name: 'Mountain Climbers', duration: 40, rest: 20, image: '⛰️' },
      { name: 'Plank Jacks', duration: 40, rest: 20, image: '🧘' },
      { name: 'Jumping Jacks', duration: 40, rest: 20, image: '⚡' },
    ],
  },
  'Viernes': {
    name: 'Core + Cardio',
    duration: 10,
    calories: 110,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Crunches', duration: 40, rest: 20, image: '💫' },
      { name: 'Plancha con elevación de pierna', duration: 40, rest: 20, image: '🧘' },
      { name: 'High Knees', duration: 40, rest: 20, image: '🔥' },
      { name: 'Bicicleta en el aire', duration: 40, rest: 20, image: '🚴' },
      { name: 'Jumping Jacks', duration: 40, rest: 20, image: '⚡' },
    ],
  },
  'Sábado': {
    name: 'Piernas + Cardio Intenso',
    duration: 10,
    calories: 130,
    difficulty: 'Avanzado',
    exercises: [
      { name: 'Sentadillas profundas', duration: 40, rest: 20, image: '🦵' },
      { name: 'Burpees', duration: 40, rest: 20, image: '🔥' },
      { name: 'Zancadas alternas', duration: 40, rest: 20, image: '🏃' },
      { name: 'Mountain Climbers', duration: 40, rest: 20, image: '⛰️' },
      { name: 'Squat Pulses', duration: 40, rest: 20, image: '💥' },
    ],
  },
};


  const todayWorkout = workouts[selectedDay] || null;

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
        playBeep();
      if (isResting) {
        if (currentExercise < todayWorkout.exercises.length - 1) {
          setCurrentExercise(prev => prev + 1);
          setTimeLeft(todayWorkout.exercises[currentExercise + 1].duration);
          setIsResting(false);
          setTimeout(() => playBeep(1200, 0.15), 300);
        } else {
            playBeep(600, 0.6);
          setIsTimerActive(false);
          setShowWorkoutModal(false);
        }
      } else {
        setTimeLeft(todayWorkout.exercises[currentExercise].rest);
        setIsResting(true);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, isResting, currentExercise, todayWorkout]);

  useEffect(() => {
    if (showWizard) {
      const scrollBarComp = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarComp}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showWizard]);


  const startWorkout = () => {
    setShowWorkoutModal(true);
    setCurrentExercise(0);
    setTimeLeft(todayWorkout.exercises[0].duration);
    setIsResting(false);
    setIsTimerActive(true);
  };

  const resetWorkout = () => {
    setIsTimerActive(false);
    setCurrentExercise(0);
    setTimeLeft(todayWorkout?.exercises[0].duration || 45);
    setIsResting(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Principiante': return 'from-green-500 to-emerald-500';
      case 'Intermedio': return 'from-yellow-500 to-orange-500';
      case 'Avanzado': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleWizardComplete = (formData) => {
    console.log('Datos del wizard:', formData);
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {showWizard && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowWizard(false)}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <WorkoutWizard
              onClose={() => setShowWizard(false)}
              onComplete={handleWizardComplete}
            />
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Plan de Entrenamiento</h1>
              <p className="text-gray-600">Entrenamientos HIIT de 10-15 minutos</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {todayWorkout ? (
          <>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className={`bg-gradient-to-r ${getDifficultyColor(todayWorkout.difficulty)} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {todayWorkout.difficulty}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{todayWorkout.name}</h2>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-6 h-6" />
                      <span className="text-lg font-semibold">{todayWorkout.duration} minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-6 h-6" />
                      <span className="text-lg font-semibold">{todayWorkout.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💪</span>
                      <span className="text-lg font-semibold">{todayWorkout.exercises.length} ejercicios</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ejercicios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todayWorkout.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{exercise.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">{exercise.name}</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                                ⏱️ {exercise.duration}s trabajo
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                💤 {exercise.rest}s descanso
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startWorkout}
                  className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Play className="w-6 h-6" />
                  <span>Comenzar Entrenamiento</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Consejos para tu HIIT
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Calienta 2-3 minutos antes con movimientos suaves</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Mantén buena técnica, la calidad es más importante que la velocidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Respeta los tiempos de descanso para recuperarte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Hidrátate antes, durante y después del entrenamiento</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100">
            <div className="text-8xl mb-4">😴</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Día de descanso</h2>
            <p className="text-gray-600">Tu cuerpo necesita recuperarse. ¡Vuelve mañana!</p>
          </div>
        )}

        {showWorkoutModal && todayWorkout && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
              <div className={`bg-gradient-to-r ${isResting ? 'from-blue-500 to-cyan-500' : 'from-purple-600 to-pink-600'} p-8 text-white relative`}>
                <button
                  onClick={() => {
                    setShowWorkoutModal(false);
                    setIsTimerActive(false);
                  }}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="text-center mb-6">
                  <div className="text-sm font-medium mb-2">
                    Ejercicio {currentExercise + 1} de {todayWorkout.exercises.length}
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${((currentExercise + 1) / todayWorkout.exercises.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="text-7xl mb-4">{todayWorkout.exercises[currentExercise].image}</div>
                  <h3 className="text-3xl font-bold mb-2">{todayWorkout.exercises[currentExercise].name}</h3>
                  <p className="text-xl text-white/80">
                    {isResting ? '¡Descansa!' : '¡Dale con todo!'}
                  </p>
                </div>

                <div className="relative w-64 h-64 mx-auto mb-8">
                  <svg className="transform -rotate-90 w-64 h-64">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-white/20"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 120}`}
                      strokeDashoffset={`${2 * Math.PI * 120 * (1 - (timeLeft / (isResting ? todayWorkout.exercises[currentExercise].rest : todayWorkout.exercises[currentExercise].duration)))}`}
                      className="text-white transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-bold mb-2">{timeLeft}</div>
                      <div className="text-xl">segundos</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsTimerActive(!isTimerActive)}
                    className="bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center hover:bg-white/90 transition shadow-lg"
                  >
                    {isTimerActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </button>
                  <button
                    onClick={resetWorkout}
                    className="bg-white/20 hover:bg-white/30 text-white w-16 h-16 rounded-full flex items-center justify-center transition"
                  >
                    <RotateCcw className="w-8 h-8" />
                  </button>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <div className="text-center text-sm text-gray-600">
                  <p className="font-semibold mb-1">Próximo ejercicio:</p>
                  {currentExercise < todayWorkout.exercises.length - 1 ? (
                    <p>{todayWorkout.exercises[currentExercise + 1].name}</p>
                  ) : (
                    <p className="text-green-600 font-bold">¡Último ejercicio!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA para personalizar plan de entrenamiento *//*}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8" />
                <h3 className="text-2xl font-bold">¿Listo para tu plan de entrenamiento personalizado?</h3>
            </div>

            <p className="text-pink-100 mb-4">
                Este es un plan base. Responde algunas preguntas y crearemos un plan adaptado a tus
                objetivos, nivel de experiencia y estilo de vida.
            </p>

            <ul className="space-y-2 text-pink-100">
                <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5"/>
                Adaptado a tu nivel y experiencia
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Ajustado a tus horarios y rutinas
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Enfocado en tus objetivos reales
                </li>
            </ul>
            </div>

            <button
            onClick={() => setShowWizard(true)}
            className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap flex items-center gap-2"
            >
            <Sparkles className="w-5 h-5" />
            Comenzar Evaluación
            </button>
        </div>
        </div>

      </div>
    </div>
  );
}

export default WorkoutPlan;*/

import { useState, useEffect } from 'react';
import { getWorkoutPlans, logWorkout } from '../../services/api';
import { Clock, Flame, Play, Calendar, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function WorkoutPlan() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isResting, setIsResting] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const navigate = useNavigate();

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    loadWorkoutPlans();
  }, []);

  const loadWorkoutPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const plans = await getWorkoutPlans();
      
      if (plans && plans.length > 0) {
        setWorkoutPlans(plans);
      } else {
        setWorkoutPlans([]);
      }
    } catch (err) {
      console.error('Error cargando planes de entrenamiento:', err);
      setError('Error al cargar los planes de entrenamiento');
      setWorkoutPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0 && currentSession) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentSession) {
      if (isResting) {
        if (currentExercise < currentSession.exercises.length - 1) {
          setCurrentExercise(prev => prev + 1);
          setTimeLeft(currentSession.exercises[currentExercise + 1].durationSeconds);
          setIsResting(false);
        } else {
          // Workout completado
          handleWorkoutComplete();
        }
      } else {
        setTimeLeft(currentSession.exercises[currentExercise].restSeconds);
        setIsResting(true);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, isResting, currentExercise, currentSession]);

  const handleWorkoutComplete = async () => {
    try {
      const totalDuration = currentSession.exercises.reduce(
        (acc, ex) => acc + ex.durationSeconds + ex.restSeconds, 
        0
      ) / 60;
      
      await logWorkout({
        workoutSessionId: currentSession.id,
        date: new Date().toISOString(),
        durationMinutes: Math.round(totalDuration),
        caloriesBurned: currentSession.estimatedCalories,
        completed: true,
        rating: 5
      });

      setIsTimerActive(false);
      setShowWorkoutModal(false);
      
      // Mostrar mensaje de éxito
      alert('¡Entrenamiento completado! 🎉');
      
      // Recargar datos
      loadWorkoutPlans();
    } catch (err) {
      console.error('Error registrando entrenamiento:', err);
    }
  };

  const startWorkout = (session) => {
    setCurrentSession(session);
    setShowWorkoutModal(true);
    setCurrentExercise(0);
    setTimeLeft(session.exercises[0].durationSeconds);
    setIsResting(false);
    setIsTimerActive(true);
  };

  const resetWorkout = () => {
    setIsTimerActive(false);
    setCurrentExercise(0);
    if (currentSession) {
      setTimeLeft(currentSession.exercises[0].durationSeconds);
    }
    setIsResting(false);
  };

  // Encontrar el plan activo
  const activePlan = workoutPlans.find(plan => plan.isActive);
  
  // Encontrar la sesión del día seleccionado
  const todaySession = activePlan?.workoutSessions?.find(
    session => session.dayOfWeek === selectedDay
  );

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'principiante': return 'from-green-500 to-emerald-500';
      case 'intermedio': return 'from-yellow-500 to-orange-500';
      case 'avanzado': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando planes de entrenamiento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 mb-4">{error}</p>
          <button 
            onClick={loadWorkoutPlans}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!workoutPlans || workoutPlans.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No tienes planes de entrenamiento
            </h2>
            <p className="text-gray-600 mb-8">
              Crea tu primer plan personalizado respondiendo unas simples preguntas
            </p>
            <button
              onClick={() => navigate('/workout/create')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
            >
              Crear Plan de Entrenamiento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Plan de Entrenamiento</h1>
              <p className="text-gray-600">
                {activePlan?.name || 'Entrenamientos personalizados'}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(day => {
              const hasSession = activePlan?.workoutSessions?.some(s => s.dayOfWeek === day);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedDay === day
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : hasSession
                        ? 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-purple-200'
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workout Session */}
        {todaySession ? (
          <>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className={`bg-gradient-to-r ${getDifficultyColor(todaySession.difficulty)} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {todaySession.difficulty || 'Intermedio'}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{todaySession.name}</h2>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-6 h-6" />
                      <span className="text-lg font-semibold">
                        {Math.round(todaySession.exercises.reduce((acc, ex) => acc + ex.durationSeconds + ex.restSeconds, 0) / 60)} minutos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-6 h-6" />
                      <span className="text-lg font-semibold">{todaySession.estimatedCalories} kcal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💪</span>
                      <span className="text-lg font-semibold">{todaySession.exercises?.length || 0} ejercicios</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ejercicios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todaySession.exercises?.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg mb-2">{exercise.name}</h4>
                          {exercise.description && (
                            <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                          )}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                                ⏱️ {exercise.durationSeconds}s trabajo
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                💤 {exercise.restSeconds}s descanso
                              </div>
                            </div>
                            {exercise.sets && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                                  🔄 {exercise.sets} series
                                </div>
                              </div>
                            )}
                          </div>
                          {exercise.tips && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-xs text-yellow-800">💡 {exercise.tips}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => startWorkout(todaySession)}
                  className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Play className="w-6 h-6" />
                  <span>Comenzar Entrenamiento</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Consejos para tu entrenamiento
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Calienta 2-3 minutos antes con movimientos suaves</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Mantén buena técnica, la calidad es más importante que la velocidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Respeta los tiempos de descanso para recuperarte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Hidrátate antes, durante y después del entrenamiento</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100">
            <div className="text-8xl mb-4">😴</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Día de descanso</h2>
            <p className="text-gray-600">Tu cuerpo necesita recuperarse. ¡Vuelve mañana!</p>
          </div>
        )}

        {/* Workout Timer Modal */}
        {showWorkoutModal && currentSession && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
              <div className={`bg-gradient-to-r ${isResting ? 'from-blue-500 to-cyan-500' : 'from-purple-600 to-pink-600'} p-8 text-white relative`}>
                <button
                  onClick={() => {
                    if (window.confirm('¿Seguro que quieres salir del entrenamiento?')) {
                      setShowWorkoutModal(false);
                      setIsTimerActive(false);
                    }
                  }}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
                >
                  ✕
                </button>
                
                <div className="text-center mb-6">
                  <div className="text-sm font-medium mb-2">
                    Ejercicio {currentExercise + 1} de {currentSession.exercises.length}
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${((currentExercise + 1) / currentSession.exercises.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="text-7xl mb-4">
                    {isResting ? '💤' : '💪'}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    {currentSession.exercises[currentExercise].name}
                  </h3>
                  <p className="text-xl text-white/80">
                    {isResting ? '¡Descansa!' : '¡Dale con todo!'}
                  </p>
                </div>

                <div className="relative w-64 h-64 mx-auto mb-8">
                  <svg className="transform -rotate-90 w-64 h-64">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-white/20"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 120}`}
                      strokeDashoffset={`${2 * Math.PI * 120 * (1 - (timeLeft / (isResting ? currentSession.exercises[currentExercise].restSeconds : currentSession.exercises[currentExercise].durationSeconds)))}`}
                      className="text-white transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-bold mb-2">{timeLeft}</div>
                      <div className="text-xl">segundos</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsTimerActive(!isTimerActive)}
                    className="bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center hover:bg-white/90 transition shadow-lg"
                  >
                    {isTimerActive ? '⏸️' : '▶️'}
                  </button>
                  <button
                    onClick={resetWorkout}
                    className="bg-white/20 hover:bg-white/30 text-white w-16 h-16 rounded-full flex items-center justify-center transition"
                  >
                    🔄
                  </button>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <div className="text-center text-sm text-gray-600">
                  <p className="font-semibold mb-1">Próximo ejercicio:</p>
                  {currentExercise < currentSession.exercises.length - 1 ? (
                    <p>{currentSession.exercises[currentExercise + 1].name}</p>
                  ) : (
                    <p className="text-green-600 font-bold">¡Último ejercicio!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutPlan;
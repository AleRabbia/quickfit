import { useState, useEffect } from 'react';
import { Dumbbell, Flame, TrendingUp, Target, Clock, Calendar, Award, Zap, ChevronRight } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({
    workoutsCompleted: 0,
    currentStreak: 0,
    totalMinutes: 0,
    caloriesBurned: 0,
  });
  
  const [animatedStats, setAnimatedStats] = useState({
    workoutsCompleted: 0,
    currentStreak: 0,
    totalMinutes: 0,
    caloriesBurned: 0,
  });

  useEffect(() => {
    const targetStats = {
      workoutsCompleted: 24,
      currentStreak: 7,
      totalMinutes: 360,
      caloriesBurned: 4320,
    };
    setStats(targetStats);

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        workoutsCompleted: Math.floor(targetStats.workoutsCompleted * progress),
        currentStreak: Math.floor(targetStats.currentStreak * progress),
        totalMinutes: Math.floor(targetStats.totalMinutes * progress),
        caloriesBurned: Math.floor(targetStats.caloriesBurned * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const weeklyProgress = [
    { day: 'L', completed: true, calories: 180 },
    { day: 'M', completed: true, calories: 150 },
    { day: 'X', completed: true, calories: 200 },
    { day: 'J', completed: true, calories: 180 },
    { day: 'V', completed: true, calories: 160 },
    { day: 'S', completed: true, calories: 190 },
    { day: 'D', completed: true, calories: 180 },
  ];

  const achievements = [
    { icon: '🔥', title: 'Racha de 7 días', desc: 'No paraste esta semana', color: 'from-orange-500 to-red-500' },
    { icon: '💪', title: '20 entrenamientos', desc: 'Ya sos un experto', color: 'from-blue-500 to-purple-500' },
    { icon: '⚡', title: 'Madrugador', desc: 'Entrenaste antes de las 8am', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-yellow-300" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">¡Estás en racha!</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">¡Hola, Ale! 👋</h1>
            <p className="text-purple-100 text-lg">
              Llevas {animatedStats.currentStreak} días consecutivos. ¡Sigue así!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{animatedStats.workoutsCompleted}</div>
                <div className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12%
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 font-medium">Entrenamientos</div>
            <div className="text-xs text-gray-500 mt-1">Este mes</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{animatedStats.currentStreak}</div>
                <div className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                  <Zap className="w-3 h-3" />
                  ¡Récord!
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 font-medium">Días consecutivos</div>
            <div className="text-xs text-gray-500 mt-1">Racha actual</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{animatedStats.totalMinutes}</div>
                <div className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8%
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 font-medium">Minutos totales</div>
            <div className="text-xs text-gray-500 mt-1">Este mes</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 p-3 rounded-xl shadow-lg">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{animatedStats.caloriesBurned}</div>
                <div className="text-xs text-green-600 font-medium flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15%
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 font-medium">Calorías quemadas</div>
            <div className="text-xs text-gray-500 mt-1">Este mes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Actividad Semanal</h2>
                <p className="text-sm text-gray-500 mt-1">Tus entrenamientos de la última semana</p>
              </div>
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>

            <div className="flex items-end justify-between gap-3 h-48">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        day.completed 
                          ? 'bg-gradient-to-t from-purple-500 to-pink-500' 
                          : 'bg-gray-200'
                      }`}
                      style={{ 
                        height: day.completed ? `${(day.calories / 200) * 100}%` : '20%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      {day.completed && (
                        <div className="text-white text-xs font-bold text-center mt-2">
                          {day.calories}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${day.completed ? 'text-purple-600' : 'text-gray-400'}`}>
                    {day.day}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">¡Excelente semana!</div>
                  <div className="text-sm text-gray-600">Completaste todos los entrenamientos</div>
                </div>
              </div>
              <div className="text-2xl">🎉</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Logros Recientes</h2>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="group p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition">
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-500">{achievement.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-xl">
              Ver todos los logros
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Entrenamiento de Hoy</h3>
            <p className="text-sm text-gray-600 mb-3">HIIT Intenso - 15 min</p>
            <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
              <Zap className="w-4 h-4" />
              <span>¡Comienza ahora!</span>
            </div>
          </button>

          <button className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition">
                <span className="text-3xl">🥗</span>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Plan Nutricional</h3>
            <p className="text-sm text-gray-600 mb-3">2000 kcal diarias</p>
            <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
              <Target className="w-4 h-4" />
              <span>Ver tu plan</span>
            </div>
          </button>

          <button className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Tu Progreso</h3>
            <p className="text-sm text-gray-600 mb-3">-2kg este mes</p>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
              <Award className="w-4 h-4" />
              <span>Ver estadísticas</span>
            </div>
          </button>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="bg-amber-500 p-3 rounded-xl shadow-lg">
              <span className="text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 text-lg mb-2">Consejo del día</h3>
              <p className="text-amber-800">
                La hidratación es clave para el rendimiento. Bebe al menos 500ml de agua 30 minutos antes de tu entrenamiento y mantén una botella cerca durante el ejercicio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
/*import { useState, useEffect } from 'react';
import { Apple, Coffee, Sun, Utensils, Moon, Flame, Droplet, CheckCircle2, Sparkles } from 'lucide-react';
import NutritionWizard from './NutritionWizard.jsx';
//import WorkoutWizard from './WorkoutWizard';

function NutritionPlan() {
  const [completedMeals, setCompletedMeals] = useState([]);
  const [showWizard, setShowWizard] = useState(false);

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

  const nutritionPlan = {
    dailyCalories: 2000,
    protein: 150,
    carbs: 200,
    fats: 65,
    water: 2.5,
    meals: [
      {
        id: 1,
        time: 'Desayuno',
        hour: '7:00 - 8:00',
        icon: Coffee,
        color: 'amber',
        gradient: 'from-amber-400 to-orange-400',
        foods: [
          { name: 'Avena con frutas del bosque', calories: 300, protein: 10, carbs: 50, fats: 8 },
          { name: 'Huevos revueltos (2 unidades)', calories: 140, protein: 12, carbs: 2, fats: 10 },
          { name: 'Pan integral tostado', calories: 80, protein: 4, carbs: 15, fats: 1 },
          { name: 'Café con leche descremada', calories: 50, protein: 3, carbs: 6, fats: 1 },
        ],
      },
      {
        id: 2,
        time: 'Media Mañana',
        hour: '10:00 - 10:30',
        icon: Sun,
        color: 'yellow',
        gradient: 'from-yellow-400 to-amber-400',
        foods: [
          { name: 'Mix de frutos secos (30g)', calories: 170, protein: 6, carbs: 8, fats: 14 },
          { name: 'Banana mediana', calories: 100, protein: 1, carbs: 27, fats: 0 },
        ],
      },
      {
        id: 3,
        time: 'Almuerzo',
        hour: '13:00 - 14:00',
        icon: Utensils,
        color: 'orange',
        gradient: 'from-orange-400 to-red-400',
        foods: [
          { name: 'Pechuga de pollo grillada (150g)', calories: 250, protein: 45, carbs: 0, fats: 7 },
          { name: 'Arroz integral (1 taza)', calories: 200, protein: 5, carbs: 45, fats: 2 },
          { name: 'Ensalada verde con aceite de oliva', calories: 90, protein: 2, carbs: 8, fats: 7 },
          { name: 'Agua con limón', calories: 5, protein: 0, carbs: 1, fats: 0 },
        ],
      },
      {
        id: 4,
        time: 'Merienda',
        hour: '16:30 - 17:00',
        icon: Apple,
        color: 'green',
        gradient: 'from-green-400 to-emerald-400',
        foods: [
          { name: 'Yogurt griego natural', calories: 120, protein: 15, carbs: 8, fats: 4 },
          { name: 'Manzana verde', calories: 80, protein: 0, carbs: 21, fats: 0 },
          { name: 'Almendras (15 unidades)', calories: 100, protein: 4, carbs: 4, fats: 9 },
        ],
      },
      {
        id: 5,
        time: 'Cena',
        hour: '20:00 - 21:00',
        icon: Moon,
        color: 'indigo',
        gradient: 'from-indigo-400 to-purple-400',
        foods: [
          { name: 'Salmón al horno (150g)', calories: 280, protein: 35, carbs: 0, fats: 15 },
          { name: 'Batata al horno (150g)', calories: 130, protein: 2, carbs: 30, fats: 0 },
          { name: 'Brócoli al vapor', calories: 50, protein: 4, carbs: 10, fats: 0 },
          { name: 'Té verde', calories: 2, protein: 0, carbs: 0, fats: 0 },
        ],
      },
    ],
  };

  const totalConsumed = completedMeals.reduce((acc, mealId) => {
    const meal = nutritionPlan.meals.find(m => m.id === mealId);
    if (!meal) return acc;
    
    const mealTotals = meal.foods.reduce((mealAcc, food) => ({
      calories: mealAcc.calories + food.calories,
      protein: mealAcc.protein + food.protein,
      carbs: mealAcc.carbs + food.carbs,
      fats: mealAcc.fats + food.fats,
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
    
    return {
      calories: acc.calories + mealTotals.calories,
      protein: acc.protein + mealTotals.protein,
      carbs: acc.carbs + mealTotals.carbs,
      fats: acc.fats + mealTotals.fats,
    };
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const toggleMeal = (mealId) => {
    if (completedMeals.includes(mealId)) {
      setCompletedMeals(completedMeals.filter(id => id !== mealId));
    } else {
      setCompletedMeals([...completedMeals, mealId]);
    }
  };

  const getMacroPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleWizardComplete = (formData) => {
    console.log('Datos del wizard:', formData);
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
        {showWizard && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowWizard(false)}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <NutritionWizard
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
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Plan Nutricional</h1>
              <p className="text-gray-600">Alimentación balanceada para tus objetivos</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg">
              <Apple className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="w-6 h-6 text-red-600" />
                <span className="text-sm font-semibold text-red-700">Calorías</span>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {totalConsumed.calories}
                <span className="text-xl text-gray-500">/{nutritionPlan.dailyCalories}</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-pink-500 h-full transition-all duration-500"
                  style={{ width: `${getMacroPercentage(totalConsumed.calories, nutritionPlan.dailyCalories)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="text-sm font-semibold text-purple-700 mb-2">Proteínas</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {totalConsumed.protein}
                <span className="text-lg text-gray-500">g</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                  style={{ width: `${getMacroPercentage(totalConsumed.protein, nutritionPlan.protein)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Meta: {nutritionPlan.protein}g</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-100">
              <div className="text-sm font-semibold text-yellow-700 mb-2">Carbohidratos</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {totalConsumed.carbs}
                <span className="text-lg text-gray-500">g</span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full transition-all duration-500"
                  style={{ width: `${getMacroPercentage(totalConsumed.carbs, nutritionPlan.carbs)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Meta: {nutritionPlan.carbs}g</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <div className="text-sm font-semibold text-orange-700 mb-2">Grasas</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {totalConsumed.fats}
                <span className="text-lg text-gray-500">g</span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-500"
                  style={{ width: `${getMacroPercentage(totalConsumed.fats, nutritionPlan.fats)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Meta: {nutritionPlan.fats}g</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Hidratación</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {nutritionPlan.water}
                <span className="text-lg text-gray-500">L</span>
              </div>
              <div className="text-xs text-gray-500">Meta diaria</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {nutritionPlan.meals.map((meal) => {
            const MealIcon = meal.icon;
            const mealTotals = meal.foods.reduce((acc, food) => ({
              calories: acc.calories + food.calories,
              protein: acc.protein + food.protein,
              carbs: acc.carbs + food.carbs,
              fats: acc.fats + food.fats,
            }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
            
            const isCompleted = completedMeals.includes(meal.id);

            return (
              <div 
                key={meal.id}
                className={`bg-white rounded-3xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
                  isCompleted ? 'border-green-500' : 'border-gray-100'
                }`}
              >
                <div className={`bg-gradient-to-r ${meal.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                        <MealIcon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-white">
                        <h3 className="text-2xl font-bold mb-1">{meal.time}</h3>
                        <p className="text-white/80 text-sm">{meal.hour}</p>
                        <div className="flex gap-4 mt-2 text-sm font-semibold">
                          <span>{mealTotals.calories} kcal</span>
                          <span>•</span>
                          <span>{mealTotals.protein}g prot</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMeal(meal.id)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-white text-green-600' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-8 h-8" />}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {meal.foods.map((food, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-800 flex-1 pr-2">{food.name}</h4>
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                            {food.calories} kcal
                          </span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                            P: {food.protein}g
                          </span>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                            C: {food.carbs}g
                          </span>
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                            G: {food.fats}g
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h3 className="font-bold text-green-900 text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">🥗</span>
              Consejos Nutricionales
            </h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Bebe agua constantemente durante el día</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Come cada 3-4 horas para mantener el metabolismo activo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Incluye proteína en cada comida principal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Evita alimentos ultraprocesados y azúcares añadidos</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 text-lg mb-4 flex items-center gap-2">
              <Droplet className="w-6 h-6" />
              Hidratación
            </h3>
            <p className="text-blue-800 mb-4">
              Mantente hidratado es fundamental para el rendimiento y la recuperación.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center text-white text-xl">
                  💧
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-700 mt-3 font-semibold">8 vasos = 2 litros diarios</p>
          </div>
        </div>

        {/* CTA para personalizar plan *//*}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8" />
                <h3 className="text-2xl font-bold">¿Listo para tu plan personalizado?</h3>
              </div>
              <p className="text-green-100 mb-4">
                Este es un plan genérico. Responde algunas preguntas y te crearemos un plan
                adaptado a tus objetivos, preferencias y estilo de vida.
              </p>
              <ul className="space-y-2 text-green-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Ajustado a tus horarios y rutinas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Considera tus alergias y preferencias
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Alineado con tu presupuesto y tiempo
                </li>
              </ul>
            </div>
            <button
              onClick={() => setShowWizard(true)}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Comenzar Cuestionario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPlan;*/
import { useState, useEffect } from 'react';
import { getMealPlans, logMeal } from '../../services/api';
import { Apple, Coffee, Sun, Utensils, Moon, Flame, Droplet, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function NutritionPlan() {
  const [mealPlans, setMealPlans] = useState([]);
  const [completedMeals, setCompletedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMealPlans();
  }, []);

  const loadMealPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const plans = await getMealPlans();
      
      if (plans && plans.length > 0) {
        setMealPlans(plans);
      } else {
        setMealPlans([]);
      }
    } catch (err) {
      console.error('Error cargando planes nutricionales:', err);
      setError('Error al cargar los planes nutricionales');
      setMealPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMeal = async (mealId) => {
    const isCompleted = completedMeals.includes(mealId);
    
    try {
      await logMeal({
        mealId: mealId,
        date: new Date().toISOString(),
        completed: !isCompleted
      });

      if (isCompleted) {
        setCompletedMeals(completedMeals.filter(id => id !== mealId));
      } else {
        setCompletedMeals([...completedMeals, mealId]);
      }
    } catch (err) {
      console.error('Error registrando comida:', err);
      alert('Error al registrar la comida');
    }
  };

  const getMealIcon = (mealType) => {
    switch(mealType?.toLowerCase()) {
      case 'desayuno': return Coffee;
      case 'media mañana': return Sun;
      case 'almuerzo': return Utensils;
      case 'merienda': return Apple;
      case 'cena': return Moon;
      default: return Utensils;
    }
  };

  const getMealColor = (mealType) => {
    switch(mealType?.toLowerCase()) {
      case 'desayuno': return { gradient: 'from-amber-400 to-orange-400', bg: 'amber' };
      case 'media mañana': return { gradient: 'from-yellow-400 to-amber-400', bg: 'yellow' };
      case 'almuerzo': return { gradient: 'from-orange-400 to-red-400', bg: 'orange' };
      case 'merienda': return { gradient: 'from-green-400 to-emerald-400', bg: 'green' };
      case 'cena': return { gradient: 'from-indigo-400 to-purple-400', bg: 'indigo' };
      default: return { gradient: 'from-gray-400 to-gray-500', bg: 'gray' };
    }
  };

  const getMacroPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  // Encontrar el plan activo
  const activePlan = mealPlans.find(plan => plan.isActive);

  // Calcular totales consumidos
  const totalConsumed = activePlan?.meals?.reduce((acc, meal) => {
    if (completedMeals.includes(meal.id)) {
      return {
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      };
    }
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 }) || { calories: 0, protein: 0, carbs: 0, fats: 0 };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando plan nutricional...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 mb-4">{error}</p>
          <button 
            onClick={loadMealPlans}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!mealPlans || mealPlans.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No tienes planes nutricionales
            </h2>
            <p className="text-gray-600 mb-8">
              Crea tu primer plan personalizado según tus objetivos y preferencias
            </p>
            <button
              onClick={() => navigate('/nutrition/create')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
            >
              Crear Plan Nutricional
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Plan Nutricional</h1>
              <p className="text-gray-600">
                {activePlan?.name || 'Alimentación balanceada para tus objetivos'}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg">
              <Apple className="w-8 h-8 text-white" />
            </div>
          </div>

          {activePlan && (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-3">
                  <Flame className="w-6 h-6 text-red-600" />
                  <span className="text-sm font-semibold text-red-700">Calorías</span>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {totalConsumed.calories}
                  <span className="text-xl text-gray-500">/{activePlan.dailyCalories}</span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-full transition-all duration-500"
                    style={{ width: `${getMacroPercentage(totalConsumed.calories, activePlan.dailyCalories)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="text-sm font-semibold text-purple-700 mb-2">Proteínas</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {totalConsumed.protein}
                  <span className="text-lg text-gray-500">g</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                    style={{ width: `${getMacroPercentage(totalConsumed.protein, activePlan.dailyProtein)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Meta: {activePlan.dailyProtein}g</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-100">
                <div className="text-sm font-semibold text-yellow-700 mb-2">Carbohidratos</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {totalConsumed.carbs}
                  <span className="text-lg text-gray-500">g</span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full transition-all duration-500"
                    style={{ width: `${getMacroPercentage(totalConsumed.carbs, activePlan.dailyCarbs)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Meta: {activePlan.dailyCarbs}g</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <div className="text-sm font-semibold text-orange-700 mb-2">Grasas</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {totalConsumed.fats}
                  <span className="text-lg text-gray-500">g</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-500"
                    style={{ width: `${getMacroPercentage(totalConsumed.fats, activePlan.dailyFats)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Meta: {activePlan.dailyFats}g</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">Hidratación</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  2.5
                  <span className="text-lg text-gray-500">L</span>
                </div>
                <div className="text-xs text-gray-500">Meta diaria</div>
              </div>
            </div>
          )}
        </div>

        {/* Meals */}
        {activePlan && (
          <div className="space-y-4">
            {activePlan.meals?.map((meal) => {
              const MealIcon = getMealIcon(meal.mealType);
              const colors = getMealColor(meal.mealType);
              const isCompleted = completedMeals.includes(meal.id);

              return (
                <div 
                  key={meal.id}
                  className={`bg-white rounded-3xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
                    isCompleted ? 'border-green-500' : 'border-gray-100'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${colors.gradient} p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                          <MealIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-white">
                          <h3 className="text-2xl font-bold mb-1">{meal.mealType}</h3>
                          <p className="text-white/80 text-sm">{meal.timeOfDay || 'Hora flexible'}</p>
                          <div className="flex gap-4 mt-2 text-sm font-semibold">
                            <span>{meal.calories} kcal</span>
                            <span>•</span>
                            <span>{meal.protein}g prot</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleMeal(meal.id)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-white text-green-600 scale-110' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="w-8 h-8" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 text-xl mb-4">{meal.name}</h4>
                    {meal.description && (
                      <p className="text-gray-600 mb-4">{meal.description}</p>
                    )}
                    
                    {meal.foods && meal.foods.length > 0 && (
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-700 text-sm">Alimentos:</h5>
                        {meal.foods.map((food, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h6 className="font-semibold text-gray-800">{food.foodName}</h6>
                                <p className="text-sm text-gray-500">{food.quantity}</p>
                              </div>
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                {food.calories} kcal
                              </span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                                P: {food.protein}g
                              </span>
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                                C: {food.carbs}g
                              </span>
                              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                                G: {food.fats}g
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h3 className="font-bold text-green-900 text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">🥗</span>
              Consejos Nutricionales
            </h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Bebe agua constantemente durante el día</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Come cada 3-4 horas para mantener el metabolismo activo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Incluye proteína en cada comida principal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">•</span>
                <span>Evita alimentos ultraprocesados y azúcares añadidos</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 text-lg mb-4 flex items-center gap-2">
              <Droplet className="w-6 h-6" />
              Hidratación
            </h3>
            <p className="text-blue-800 mb-4">
              Mantenerte hidratado es fundamental para el rendimiento y la recuperación.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center text-white text-xl">
                  💧
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-700 mt-3 font-semibold">8 vasos = 2 litros diarios</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPlan;
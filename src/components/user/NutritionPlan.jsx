import { useState, useEffect } from 'react';
import { getNutritionPlans } from '../../services/api';
import { Apple, Coffee, Sun, Moon, Utensils } from 'lucide-react';

function NutritionPlan() {
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNutritionPlan();
  }, []);

  const loadNutritionPlan = async () => {
    try {
      // const data = await getNutritionPlans();
      // setNutritionPlan(data);
      
      // Datos de ejemplo
      setNutritionPlan({
        dailyCalories: 2000,
        protein: 150,
        carbs: 200,
        fats: 65,
        meals: [
          {
            id: 1,
            time: 'Desayuno',
            icon: Coffee,
            color: 'amber',
            foods: [
              { name: 'Avena con frutas', calories: 300, protein: 10 },
              { name: 'Huevos revueltos (2)', calories: 140, protein: 12 },
              { name: 'Pan integral', calories: 80, protein: 4 },
            ],
          },
          {
            id: 2,
            time: 'Media Mañana',
            icon: Sun,
            color: 'yellow',
            foods: [
              { name: 'Frutos secos (30g)', calories: 170, protein: 6 },
              { name: 'Banana', calories: 100, protein: 1 },
            ],
          },
          {
            id: 3,
            time: 'Almuerzo',
            icon: Utensils,
            color: 'orange',
            foods: [
              { name: 'Pechuga de pollo (150g)', calories: 250, protein: 45 },
              { name: 'Arroz integral (1 taza)', calories: 200, protein: 5 },
              { name: 'Ensalada verde', calories: 50, protein: 2 },
              { name: 'Aceite de oliva (1 cdta)', calories: 40, protein: 0 },
            ],
          },
          {
            id: 4,
            time: 'Merienda',
            icon: Apple,
            color: 'green',
            foods: [
              { name: 'Yogurt griego', calories: 120, protein: 15 },
              { name: 'Manzana', calories: 80, protein: 0 },
            ],
          },
          {
            id: 5,
            time: 'Cena',
            icon: Moon,
            color: 'indigo',
            foods: [
              { name: 'Salmón (150g)', calories: 280, protein: 35 },
              { name: 'Batata al horno', calories: 150, protein: 3 },
              { name: 'Brócoli al vapor', calories: 50, protein: 4 },
            ],
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading nutrition plan:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Cargando plan nutricional...</div>
      </div>
    );
  }

  const totalCalories = nutritionPlan.meals.reduce(
    (acc, meal) => acc + meal.foods.reduce((sum, food) => sum + food.calories, 0),
    0
  );

  const totalProtein = nutritionPlan.meals.reduce(
    (acc, meal) => acc + meal.foods.reduce((sum, food) => sum + food.protein, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Plan Nutricional</h1>
        <p className="text-gray-600">Alimentación balanceada para complementar tu entrenamiento</p>
      </div>

      {/* Macros Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-3xl font-bold text-indigo-600 mb-1">{totalCalories}</div>
          <div className="text-sm text-gray-600">Calorías totales</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-3xl font-bold text-red-600 mb-1">{totalProtein}g</div>
          <div className="text-sm text-gray-600">Proteínas</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-3xl font-bold text-yellow-600 mb-1">{nutritionPlan.carbs}g</div>
          <div className="text-sm text-gray-600">Carbohidratos</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-3xl font-bold text-green-600 mb-1">{nutritionPlan.fats}g</div>
          <div className="text-sm text-gray-600">Grasas</div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-4">
        {nutritionPlan.meals.map((meal) => {
          const MealIcon = meal.icon;
          const mealCalories = meal.foods.reduce((sum, food) => sum + food.calories, 0);
          const mealProtein = meal.foods.reduce((sum, food) => sum + food.protein, 0);

          return (
            <div key={meal.id} className="bg-white rounded-xl shadow overflow-hidden">
              <div className={`bg-${meal.color}-100 p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className={`bg-${meal.color}-200 p-2 rounded-lg`}>
                    <MealIcon className={`w-6 h-6 text-${meal.color}-700`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-${meal.color}-900 text-lg`}>{meal.time}</h3>
                    <p className={`text-sm text-${meal.color}-700`}>
                      {mealCalories} kcal • {mealProtein}g proteína
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {meal.foods.map((food, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{food.name}</div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{food.calories} kcal</span>
                        <span>{food.protein}g prot.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="font-semibold text-green-900 mb-2">🥗 Consejos nutricionales</h3>
        <ul className="text-green-800 space-y-1 text-sm">
          <li>• Bebe al menos 2 litros de agua al día</li>
          <li>• Come cada 3-4 horas para mantener tu metabolismo activo</li>
          <li>• Ajusta las porciones según tu nivel de actividad</li>
          <li>• Incluye verduras en al menos 2 comidas principales</li>
          <li>• Evita alimentos ultraprocesados y azúcares añadidos</li>
        </ul>
      </div>
    </div>
  );
}

export default NutritionPlan;
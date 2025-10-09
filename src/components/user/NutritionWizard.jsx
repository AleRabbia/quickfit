import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, User, Heart, Utensils, Activity, DollarSign, CheckCircle2 } from 'lucide-react';

function NutritionWizard({ onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1: Datos Personales y Antropométricos
    name: '',
    age: '',
    biologicalSex: '',
    gender: '',
    occupation: '',
    activityLevel: '',
    height: '',
    weight: '',
    waist: '',
    hip: '',
    mainGoal: '',
    goalDetails: '',
    
    // Paso 2: Historial Médico
    medicalConditions: '',
    allergies: '',
    medications: '',
    surgicalHistory: '',
    digestiveIssues: [],
    
    // Paso 3: Hábitos Alimentarios
    dietType: '',
    mealsPerDay: '',
    hungerTimes: [],
    firstMeal: '',
    lastMeal: '',
    dislikedFoods: '',
    favoriteFoods: '',
    waterIntake: '',
    beverageConsumption: '',
    
    // Paso 4: Actividad Física y Estilo de Vida
    exerciseType: '',
    exerciseFrequency: '',
    exerciseDuration: '',
    exerciseTime: '',
    sleepHours: '',
    sleepQuality: '',
    stressLevel: '',
    whoPreparesFood: '',
    eatsOutFrequency: '',
    
    // Paso 5: Factores Socioeconómicos
    budget: '',
    cookingTime: '',
    needPortable: false,
    preferredSupport: '',
  });

  const totalSteps = 5;

  const goals = [
    { id: 'weight_loss', label: 'Pérdida de Peso', icon: '📉', color: 'from-red-500 to-orange-500' },
    { id: 'muscle_gain', label: 'Aumento de Masa Muscular', icon: '💪', color: 'from-purple-500 to-pink-500' },
    { id: 'sports_performance', label: 'Rendimiento Deportivo', icon: '🏃', color: 'from-blue-500 to-cyan-500' },
    { id: 'healthy_eating', label: 'Alimentación Saludable', icon: '🥗', color: 'from-green-500 to-emerald-500' },
    { id: 'medical_condition', label: 'Manejo de Condición Médica', icon: '🏥', color: 'from-indigo-500 to-purple-500' },
    { id: 'other', label: 'Otro', icon: '✨', color: 'from-yellow-500 to-orange-500' },
  ];

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentario', desc: 'Oficina, poco movimiento', icon: '💺' },
    { id: 'light', label: 'Actividad Ligera', desc: 'Movimiento ocasional', icon: '🚶' },
    { id: 'moderate', label: 'Actividad Moderada', desc: 'Trabajo con movimiento', icon: '🏃' },
    { id: 'heavy', label: 'Actividad Intensa', desc: 'Trabajo físico pesado', icon: '💪' },
  ];

  const sexOptions = [
    { id: 'male', label: 'Masculino', icon: '♂️' },
    { id: 'female', label: 'Femenino', icon: '♀️' },
    { id: 'other', label: 'Otro/Prefiero no decir', icon: '⚧️' },
  ];

  const digestiveIssuesOptions = [
    { id: 'constipation', label: 'Estreñimiento' },
    { id: 'diarrhea', label: 'Diarrea' },
    { id: 'reflux', label: 'Reflujo' },
    { id: 'bloating', label: 'Hinchazón' },
    { id: 'gas', label: 'Gases' },
    { id: 'none', label: 'Ninguno' },
  ];

  const dietTypes = [
    { id: 'omnivore', label: 'Omnívora', desc: 'Come de todo', icon: '🍽️' },
    { id: 'vegetarian', label: 'Vegetariana', desc: 'Sin carne', icon: '🥗' },
    { id: 'vegan', label: 'Vegana', desc: 'Sin productos animales', icon: '🌱' },
    { id: 'mediterranean', label: 'Mediterránea', desc: 'Estilo mediterráneo', icon: '🫒' },
    { id: 'keto', label: 'Keto/Low Carb', desc: 'Baja en carbohidratos', icon: '🥑' },
    { id: 'other', label: 'Otra', desc: 'Especificar', icon: '✨' },
  ];

  const hungerTimesOptions = [
    { id: 'early_morning', label: 'Temprano (6-8am)' },
    { id: 'mid_morning', label: 'Media Mañana (9-11am)' },
    { id: 'lunch', label: 'Almuerzo (12-2pm)' },
    { id: 'afternoon', label: 'Tarde (3-5pm)' },
    { id: 'evening', label: 'Noche (6-8pm)' },
    { id: 'late_night', label: 'Noche Tardía (9pm+)' },
  ];

  const exerciseTimes = [
    { id: 'morning', label: 'Mañana', icon: '🌅' },
    { id: 'afternoon', label: 'Tarde', icon: '☀️' },
    { id: 'evening', label: 'Noche', icon: '🌙' },
    { id: 'none', label: 'No hago ejercicio', icon: '💤' },
  ];

  const budgetOptions = [
    { id: 'low', label: 'Bajo', icon: '💵', color: 'from-gray-500 to-gray-600' },
    { id: 'moderate', label: 'Moderado', icon: '💰', color: 'from-green-500 to-emerald-500' },
    { id: 'high', label: 'Alto', icon: '💎', color: 'from-purple-500 to-pink-500' },
  ];

  const cookingTimeOptions = [
    { id: 'less_30', label: 'Menos de 30 min', icon: '⚡' },
    { id: '30_to_60', label: '30 min - 1 hora', icon: '⏰' },
    { id: 'more_60', label: 'Más de 1 hora', icon: '🕐' },
  ];

  const supportTypes = [
    { id: 'detailed_menu', label: 'Menús Detallados', desc: 'Día a día específico', icon: '📋' },
    { id: 'flexible', label: 'Intercambios Flexibles', desc: 'Lista de opciones', icon: '🔄' },
    { id: 'simple_recipes', label: 'Recetas Sencillas', desc: 'Rápidas y fáciles', icon: '⚡' },
  ];

  const whoPreparesOptions = [
    { id: 'myself', label: 'Yo mismo/a', icon: '👨‍🍳' },
    { id: 'family', label: 'Pareja/Familia', icon: '👨‍👩‍👧' },
    { id: 'prepared', label: 'Comida preparada/Restaurantes', icon: '🏪' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    if (onComplete) {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1:
        return formData.age && formData.biologicalSex && formData.activityLevel && 
               formData.height && formData.weight && formData.mainGoal;
      case 2:
        return true; // Paso opcional
      case 3:
        return formData.dietType && formData.mealsPerDay;
      case 4:
        return formData.exerciseTime && formData.sleepHours && formData.stressLevel && formData.whoPreparesFood;
      case 5:
        return formData.budget && formData.cookingTime && formData.preferredSupport;
      default:
        return false;
    }
  };

  return (
    <div >{/*className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center overflow-y-auto z-50">*/}
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-t-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Plan de Nutrición Personalizado</h2>
                </div>
                <p className="text-green-100">Responde estas preguntas para crear tu plan nutricional ideal</p>
            </div>
            </div>

            {/* Progress Bar */}
            <div className="px-8 pt-6">
            <div className="flex items-center gap-2 mb-2">
                {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className="flex-1">
                    <div className={`h-2 rounded-full transition-all duration-300 ${
                    index + 1 <= currentStep 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                        : 'bg-gray-200'
                    }`}></div>
                </div>
                ))}
            </div>
            <div className="text-sm text-gray-600 text-center">
                Paso {currentStep} de {totalSteps}
            </div>
            </div>

            {/* Content */}
            <div className="p-8">
            {/* Paso 1: Datos Personales y Antropométricos */}
            {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-3 rounded-xl">
                    <User className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Datos Personales y Antropométricos</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre Completo (Opcional)
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="Juan Pérez"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Edad *
                    </label>
                    <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="30"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Sexo Biológico *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {sexOptions.map(sex => (
                        <button
                        key={sex.id}
                        onClick={() => handleInputChange('biologicalSex', sex.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.biologicalSex === sex.id
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-transparent text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                        >
                        <div className="text-2xl mb-2">{sex.icon}</div>
                        <div className="text-sm font-semibold">{sex.label}</div>
                        </button>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Género (Opcional)
                    </label>
                    <input
                    type="text"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                    placeholder="Cómo te identificas"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ocupación
                    </label>
                    <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                    placeholder="Ej: Oficinista, Docente, Construcción..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Nivel de Actividad Laboral *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activityLevels.map(level => (
                        <button
                        key={level.id}
                        onClick={() => handleInputChange('activityLevel', level.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.activityLevel === level.id
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-transparent text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                        >
                        <div className="text-3xl mb-2">{level.icon}</div>
                        <div className="font-bold mb-1">{level.label}</div>
                        <div className={`text-sm ${formData.activityLevel === level.id ? 'text-green-100' : 'text-gray-600'}`}>
                            {level.desc}
                        </div>
                        </button>
                    ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estatura (cm) *
                    </label>
                    <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="170"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Peso (kg) *
                    </label>
                    <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="70"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cintura (cm)
                    </label>
                    <input
                        type="number"
                        value={formData.waist}
                        onChange={(e) => handleInputChange('waist', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="80"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cadera (cm)
                    </label>
                    <input
                        type="number"
                        value={formData.hip}
                        onChange={(e) => handleInputChange('hip', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="95"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Objetivo Principal *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {goals.map(goal => (
                        <button
                        key={goal.id}
                        onClick={() => handleInputChange('mainGoal', goal.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.mainGoal === goal.id
                            ? `bg-gradient-to-br ${goal.color} border-transparent text-white shadow-lg scale-105`
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                        >
                        <div className="text-3xl mb-2">{goal.icon}</div>
                        <div className="text-sm font-semibold">{goal.label}</div>
                        </button>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detalles del Objetivo
                    </label>
                    <textarea
                    value={formData.goalDetails}
                    onChange={(e) => handleInputChange('goalDetails', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition resize-none"
                    rows="2"
                    placeholder="Ej: Perder 5kg en 3 meses, mejorar rendimiento en maratón..."
                    />
                </div>
                </div>
            )}

            {/* Paso 2: Historial Médico */}
            {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-red-100 p-3 rounded-xl">
                    <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Historial Médico</h3>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <p className="text-sm text-blue-800">
                    Esta información es confidencial y nos ayudará a crear un plan seguro y adecuado para ti.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Condiciones Médicas Preexistentes
                    </label>
                    <textarea
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition resize-none"
                    rows="3"
                    placeholder="Ej: Diabetes tipo 2, hipertensión, hipotiroidismo..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alergias o Intolerancias Alimentarias
                    </label>
                    <textarea
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition resize-none"
                    rows="2"
                    placeholder="Ej: Intolerancia a la lactosa, alergia a frutos secos..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Medicamentos o Suplementos Actuales
                    </label>
                    <textarea
                    value={formData.medications}
                    onChange={(e) => handleInputChange('medications', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition resize-none"
                    rows="2"
                    placeholder="Ej: Metformina 500mg, Vitamina D..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Historial Quirúrgico Digestivo
                    </label>
                    <input
                    type="text"
                    value={formData.surgicalHistory}
                    onChange={(e) => handleInputChange('surgicalHistory', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                    placeholder="Ej: Cirugía bariátrica, extirpación de vesícula..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Problemas Digestivos Frecuentes
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {digestiveIssuesOptions.map(issue => (
                        <button
                        key={issue.id}
                        onClick={() => handleArrayToggle('digestiveIssues', issue.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.digestiveIssues.includes(issue.id)
                            ? 'bg-gradient-to-br from-red-500 to-orange-500 border-transparent text-white shadow-lg'
                            : 'border-gray-200 hover:border-red-300 bg-white'
                        }`}
                        >
                        <div className="text-sm font-semibold">{issue.label}</div>
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            )}

            {/* Paso 3: Hábitos Alimentarios */}
            {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-orange-100 p-3 rounded-xl">
                    <Utensils className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Hábitos Alimentarios</h3>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipo de Dieta Actual *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {dietTypes.map(diet => (
                        <button
                        key={diet.id}
                        onClick={() => handleInputChange('dietType', diet.id)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.dietType === diet.id
                            ? 'bg-gradient-to-br from-orange-500 to-red-500 border-transparent text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-orange-300 bg-white'
                        }`}
                        >
                        <div className="text-3xl mb-2">{diet.icon}</div>
                        <div className="font-bold mb-1">{diet.label}</div>
                        <div className={`text-xs ${formData.dietType === diet.id ? 'text-orange-100' : 'text-gray-600'}`}>
                            {diet.desc}
                        </div>
                        </button>
                    ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Comidas por Día *
                    </label>
                    <input
                        type="number"
                        value={formData.mealsPerDay}
                        onChange={(e) => handleInputChange('mealsPerDay', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="Ej: 3 comidas + 2 snacks"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Consumo de Agua Diario (litros)
                    </label>
                    <input
                        type="number"
                        step="0.5"
                        value={formData.waterIntake}
                        onChange={(e) => handleInputChange('waterIntake', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="Ej: 2"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ¿Cuándo sientes más hambre?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hungerTimesOptions.map(time => (
                        <button
                        key={time.id}
                        onClick={() => handleArrayToggle('hungerTimes', time.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.hungerTimes.includes(time.id)
                            ? 'bg-gradient-to-br from-yellow-500 to-orange-500 border-transparent text-white shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300 bg-white'
                        }`}
                        >
                        <div className="text-sm font-semibold">{time.label}</div>
                        </button>
                    ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hora Primera Comida
                    </label>
                    <input
                        type="time"
                        value={formData.firstMeal}
                        onChange={(e) => handleInputChange('firstMeal', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hora Última Comida
                    </label>
                    <input
                        type="time"
                        value={formData.lastMeal}
                        onChange={(e) => handleInputChange('lastMeal', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alimentos que NO te gustan o evitas
                    </label>
                    <textarea
                    value={formData.dislikedFoods}
                    onChange={(e) => handleInputChange('dislikedFoods', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition resize-none"
                    rows="2"
                    placeholder="Ej: No me gusta la calabaza, evito el pescado..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alimentos Favoritos/Indispensables
                    </label>
                    <textarea
                    value={formData.favoriteFoods}
                    onChange={(e) => handleInputChange('favoriteFoods', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition resize-none"
                    rows="2"
                    placeholder="Ej: El café es vital, me encanta el aguacate..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Consumo de Bebidas Azucaradas, Alcohol y Café/Té
                    </label>
                    <textarea
                    value={formData.beverageConsumption}
                    onChange={(e) => handleInputChange('beverageConsumption', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition resize-none"
                    rows="2"
                    placeholder="Ej: 2 cafés al día, 1 copa de vino los fines de semana..."
                    />
                </div>
                </div>
            )}

            {/* Paso 4: Actividad Física y Estilo de Vida */}
            {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl">
                    <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Actividad Física y Estilo de Vida</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Ejercicio
                    </label>
                    <input
                        type="text"
                        value={formData.exerciseType}
                        onChange={(e) => handleInputChange('exerciseType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="Ej: Correr, pesas, yoga..."
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Frecuencia Semanal
                    </label>
                    <input
                        type="number"
                        value={formData.exerciseFrequency}
                        onChange={(e) => handleInputChange('exerciseFrequency', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="Días por semana"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duración de la Sesión (minutos)
                    </label>
                    <input
                    type="number"
                    value={formData.exerciseDuration}
                    onChange={(e) => handleInputChange('exerciseDuration', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                    placeholder="Ej: 45"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Momento del Día en que Entrenas *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {exerciseTimes.map(time => (
                        <button
                        key={time.id}
                        onClick={() => handleInputChange('exerciseTime', time.id)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                            formData.exerciseTime === time.id
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-transparent text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-blue-300 bg-white'
                        }`}
                        >
                        <div className="text-3xl mb-2">{time.icon}</div>
                        <div className="text-sm font-semibold">{time.label}</div>
                        </button>
                    ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Horas de Sueño Promedio *
                    </label>
                    <input
                        type="number"
                        step="0.5"
                        value={formData.sleepHours}
                        onChange={(e) => handleInputChange('sleepHours', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="Ej: 7"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Calidad del Sueño (1-10)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.sleepQuality}
                        onChange={(e) => handleInputChange('sleepQuality', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                        placeholder="1 = Muy mala, 10 = Excelente"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nivel de Estrés Percibido (1-10) *
                    </label>
                    <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.stressLevel || 5}
                    onChange={(e) => handleInputChange('stressLevel', e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Muy bajo (1)</span>
                    <span className="font-bold text-lg text-green-600">{formData.stressLevel || 5}</span>
                    <span>Muy alto (10)</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ¿Quién prepara tu comida? *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {whoPreparesOptions.map(who => (
                        <button
                        key={who.id}
                        onClick={() => handleInputChange('whoPreparesFood', who.id)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                            formData.whoPreparesFood === who.id
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-transparent text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-purple-300 bg-white'
                        }`}
                        >
                        <div className="text-3xl mb-2">{who.icon}</div>
                        <div className="text-sm font-semibold">{who.label}</div>
                        </button>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Con qué frecuencia comes fuera de casa?
                    </label>
                    <input
                    type="number"
                    value={formData.eatsOutFrequency}
                    onChange={(e) => handleInputChange('eatsOutFrequency', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition"
                    placeholder="Días por semana"
                    />
                </div>
                </div>
            )}

            {/* Paso 5: Factores Socioeconómicos */}
            {currentStep === 5 && (
                <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 p-3 rounded-xl">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Preferencias y Recursos</h3>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Presupuesto para Alimentación *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {budgetOptions.map(budget => (
                        <button
                        key={budget.id}
                        onClick={() => handleInputChange('budget', budget.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                            formData.budget === budget.id
                            ? `bg-gradient-to-br ${budget.color} border-transparent text-white shadow-lg scale-105`
                            : 'border-gray-200 hover:border-purple-300 bg-white'
                        }`}
                        >
                        <div className="text-4xl mb-2">{budget.icon}</div>
                        <div className="font-bold text-lg">{budget.label}</div>
                        </button>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tiempo Disponible para Cocinar *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cookingTimeOptions.map(time => (
                        <button
                        key={time.id}
                        onClick={() => handleInputChange('cookingTime', time.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                            formData.cookingTime === time.id
                            ? 'bg-gradient-to-br from-orange-500 to-red-500 border-transparent text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-orange-300 bg-white'
                        }`}
                        >
                        <div className="text-3xl mb-2">{time.icon}</div>
                        <div className="font-bold">{time.label}</div>
                        </button>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="flex items-center gap-3 cursor-pointer group p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 transition">
                    <input
                        type="checkbox"
                        checked={formData.needPortable}
                        onChange={(e) => handleInputChange('needPortable', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                    />
                    <div>
                        <span className="text-gray-800 font-semibold group-hover:text-green-600 transition">
                        Necesito comidas portátiles para el trabajo/estudios
                        </span>
                        <p className="text-sm text-gray-600">Incluiremos opciones fáciles de transportar</p>
                    </div>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipo de Apoyo que Prefieres *
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                    {supportTypes.map(support => (
                        <button
                        key={support.id}
                        onClick={() => handleInputChange('preferredSupport', support.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                            formData.preferredSupport === support.id
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-transparent text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                        >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">{support.icon}</div>
                            <div className="flex-1">
                            <div className="font-bold text-lg mb-1">{support.label}</div>
                            <div className={`text-sm ${formData.preferredSupport === support.id ? 'text-green-100' : 'text-gray-600'}`}>
                                {support.desc}
                            </div>
                            </div>
                        </div>
                        </button>
                    ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                        <div className="font-semibold text-green-900 mb-2">¡Todo listo para crear tu plan!</div>
                        <div className="text-green-800 text-sm">
                        Con esta información diseñaremos un plan nutricional personalizado que se ajusta a tu estilo de vida, objetivos y preferencias alimentarias.
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}
            </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50 rounded-b-3xl">
          <button
            onClick={currentStep === 1 ? onClose : prevStep}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            {currentStep === 1 ? 'Cancelar' : 'Anterior'}
          </button>

          <button
            onClick={currentStep === totalSteps ? handleSubmit : nextStep}
            disabled={!canProceed()}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
          >
            {currentStep === totalSteps ? (
              <>
                <Sparkles className="w-5 h-5" />
                Generar Plan Nutricional
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default NutritionWizard;
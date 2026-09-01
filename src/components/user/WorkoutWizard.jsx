import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  Target,
  Calendar,
  Dumbbell,
  CheckCircle2,
} from "lucide-react";

function WorkoutWizard({ onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1: Información Personal
    name: "",
    age: "",
    mainGoal: "",
    experienceLevel: "",
    medicalHistory: "",
    isPregnant: false,

    // Paso 2: Disponibilidad
    trainingDays: [],
    sessionDuration: "",
    trainingStyle: "",

    // Paso 3: Equipamiento
    trainingPlace: "",
    equipment: [],

    // Paso 4: Preferencias
    dislikedExercises: "",
    trainingFocus: "",
    useAI: true,
  });

  const totalSteps = 4;

  const goals = [
    {
      id: "lose_weight",
      label: "Perder Peso",
      icon: "🔥",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "gain_muscle",
      label: "Ganar Músculo",
      icon: "💪",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "cardio",
      label: "Resistencia Cardiovascular",
      icon: "❤️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "maintain",
      label: "Mantener Forma",
      icon: "⚖️",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "flexibility",
      label: "Flexibilidad",
      icon: "🧘",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "other",
      label: "Otro",
      icon: "✨",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const experienceLevels = [
    {
      id: "beginner",
      label: "Principiante",
      desc: "Menos de 6 meses",
      icon: "🌱",
    },
    {
      id: "intermediate",
      label: "Intermedio",
      desc: "6 meses - 2 años",
      icon: "🏃",
    },
    { id: "advanced", label: "Avanzado", desc: "Más de 2 años", icon: "🏆" },
  ];

  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const sessionDurations = [
    { value: "10", label: "10 minutos", icon: "⚡" },
    { value: "15", label: "15 minutos", icon: "🔥" },
    { value: "20", label: "20 minutos", icon: "💪" },
    { value: "30", label: "30 minutos", icon: "🏋️" },
  ];

  const trainingStyles = [
    {
      id: "hiit",
      label: "HIIT",
      desc: "Alta intensidad por intervalos",
      icon: "⚡",
    },
    { id: "strength", label: "Fuerza", desc: "Construir músculo", icon: "💪" },
    { id: "mixed", label: "Mixto", desc: "Combinación de ambos", icon: "🔄" },
    { id: "cardio", label: "Cardio", desc: "Resistencia aeróbica", icon: "❤️" },
  ];

  const equipmentOptions = [
    { id: "none", label: "Solo peso corporal", icon: "🤸" },
    { id: "bands", label: "Bandas de resistencia", icon: "🎯" },
    { id: "dumbbells", label: "Mancuernas/Pesas", icon: "🏋️" },
    { id: "kettlebell", label: "Kettlebell", icon: "⚫" },
    { id: "rope", label: "Cuerda para saltar", icon: "➰" },
    { id: "mat", label: "Esterilla", icon: "🧘" },
    { id: "cardio_machine", label: "Máquina de cardio", icon: "🚴" },
  ];

  const trainingPlaces = [
    { id: "home", label: "Casa", icon: "🏠" },
    { id: "gym", label: "Gimnasio", icon: "🏋️" },
    { id: "outdoor", label: "Aire libre", icon: "🌳" },
  ];

  const trainingFocuses = [
    {
      id: "full_body",
      label: "Cuerpo Completo",
      desc: "Todo en una sesión",
      icon: "🔥",
    },
    {
      id: "split",
      label: "División Muscular",
      desc: "Días específicos por grupo",
      icon: "📊",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Datos del formulario:", formData);
    if (onComplete) {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.age && formData.mainGoal && formData.experienceLevel;
      case 2:
        return (
          formData.trainingDays.length > 0 &&
          formData.sessionDuration &&
          formData.trainingStyle
        );
      case 3:
        return formData.trainingPlace && formData.equipment.length > 0;
      case 4:
        return formData.trainingFocus;
      default:
        return false;
    }
  };

  return (
    <div>
      {" "}
      {/*className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">*/}
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-t-3xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-3xl font-bold">
                Plan de Entrenamiento Personalizado
              </h2>
            </div>
            <p className="text-purple-100">
              Responde estas preguntas para crear tu plan perfecto
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6">
          <div className="flex items-center gap-2 mb-2">
            {[...Array(totalSteps)].map((_, index) => (
              <div key={index} className="flex-1">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index + 1 <= currentStep
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-gray-200"
                  }`}
                ></div>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600 text-center">
            Paso {currentStep} de {totalSteps}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Paso 1: Información Personal */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Información Personal
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre/Alias (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition"
                    placeholder="Juan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Edad *
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition"
                    placeholder="30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Objetivo Principal *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => handleInputChange("mainGoal", goal.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.mainGoal === goal.id
                          ? `bg-gradient-to-br ${goal.color} border-transparent text-white shadow-lg scale-105`
                          : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                    >
                      <div className="text-3xl mb-2">{goal.icon}</div>
                      <div className="text-sm font-semibold">{goal.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nivel de Experiencia *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() =>
                        handleInputChange("experienceLevel", level.id)
                      }
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.experienceLevel === level.id
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 border-transparent text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                    >
                      <div className="text-3xl mb-2">{level.icon}</div>
                      <div className="font-bold mb-1">{level.label}</div>
                      <div
                        className={`text-sm ${formData.experienceLevel === level.id ? "text-purple-100" : "text-gray-600"}`}
                      >
                        {level.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Historial Médico Relevante
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) =>
                    handleInputChange("medicalHistory", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition resize-none"
                  rows="3"
                  placeholder="¿Lesiones, condiciones médicas o restricciones? Ej: Dolor de rodilla, problemas de espalda..."
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.isPregnant}
                    onChange={(e) =>
                      handleInputChange("isPregnant", e.target.checked)
                    }
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-gray-700 group-hover:text-purple-600 transition">
                    Embarazo o Posparto (si aplica)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Paso 2: Disponibilidad */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Disponibilidad y Tiempo
                </h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Días de la Semana para Entrenar *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleArrayToggle("trainingDays", day)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.trainingDays.includes(day)
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 border-transparent text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-blue-300 bg-white"
                      }`}
                    >
                      <div className="font-semibold">{day}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Seleccionados: {formData.trainingDays.length} día(s)
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Duración por Sesión *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sessionDurations.map((duration) => (
                    <button
                      key={duration.value}
                      onClick={() =>
                        handleInputChange("sessionDuration", duration.value)
                      }
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        formData.sessionDuration === duration.value
                          ? "bg-gradient-to-br from-orange-500 to-red-500 border-transparent text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-orange-300 bg-white"
                      }`}
                    >
                      <div className="text-3xl mb-2">{duration.icon}</div>
                      <div className="font-semibold">{duration.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Estilo de Entrenamiento *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trainingStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() =>
                        handleInputChange("trainingStyle", style.id)
                      }
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.trainingStyle === style.id
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 border-transparent text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                    >
                      <div className="text-3xl mb-2">{style.icon}</div>
                      <div className="font-bold mb-1">{style.label}</div>
                      <div
                        className={`text-sm ${formData.trainingStyle === style.id ? "text-purple-100" : "text-gray-600"}`}
                      >
                        {style.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Equipamiento */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Dumbbell className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Equipamiento y Lugar
                </h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Lugar de Entrenamiento *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {trainingPlaces.map((place) => (
                    <button
                      key={place.id}
                      onClick={() =>
                        handleInputChange("trainingPlace", place.id)
                      }
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        formData.trainingPlace === place.id
                          ? "bg-gradient-to-br from-green-500 to-emerald-500 border-transparent text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-green-300 bg-white"
                      }`}
                    >
                      <div className="text-4xl mb-2">{place.icon}</div>
                      <div className="font-semibold">{place.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Equipamiento Disponible * (Selecciona todos los que tengas)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {equipmentOptions.map((equipment) => (
                    <button
                      key={equipment.id}
                      onClick={() =>
                        handleArrayToggle("equipment", equipment.id)
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.equipment.includes(equipment.id)
                          ? "bg-gradient-to-br from-indigo-500 to-purple-500 border-transparent text-white shadow-lg"
                          : "border-gray-200 hover:border-indigo-300 bg-white"
                      }`}
                    >
                      <div className="text-2xl mb-2">{equipment.icon}</div>
                      <div className="text-sm font-semibold">
                        {equipment.label}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Seleccionados: {formData.equipment.length} elemento(s)
                </div>
              </div>
            </div>
          )}

          {/* Paso 4: Preferencias */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Preferencias Finales
                </h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ejercicios que NO te gustan
                </label>
                <textarea
                  value={formData.dislikedExercises}
                  onChange={(e) =>
                    handleInputChange("dislikedExercises", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition resize-none"
                  rows="3"
                  placeholder="Ej: Burpees, saltos, planchas..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Enfoque del Entrenamiento *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trainingFocuses.map((focus) => (
                    <button
                      key={focus.id}
                      onClick={() =>
                        handleInputChange("trainingFocus", focus.id)
                      }
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.trainingFocus === focus.id
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 border-transparent text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                    >
                      <div className="text-3xl mb-2">{focus.icon}</div>
                      <div className="font-bold mb-1">{focus.label}</div>
                      <div
                        className={`text-sm ${formData.trainingFocus === focus.id ? "text-purple-100" : "text-gray-600"}`}
                      >
                        {focus.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-900 mb-2">
                      ¡Casi listo!
                    </div>
                    <div className="text-green-800 text-sm">
                      Con esta información crearemos un plan de entrenamiento
                      personalizado que se adapta perfectamente a tus
                      necesidades, objetivos y disponibilidad.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4">
                <label className="flex items-center gap-3 cursor-pointer select-none text-purple-900 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.useAI}
                    onChange={(e) =>
                      handleInputChange("useAI", e.target.checked)
                    }
                    className="h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  Generar con IA (Gemini)
                </label>
                <p className="mt-2 text-sm text-purple-700">
                  Activa esta opción para que Gemini cree un plan personalizado
                  según tus datos.
                </p>
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
            {currentStep === 1 ? "Cancelar" : "Anterior"}
          </button>

          <button
            onClick={currentStep === totalSteps ? handleSubmit : nextStep}
            disabled={!canProceed()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
          >
            {currentStep === totalSteps ? (
              <>
                <Sparkles className="w-5 h-5" />
                Generar Plan
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

export default WorkoutWizard;

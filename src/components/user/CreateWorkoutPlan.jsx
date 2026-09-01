import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutWizard from "./WorkoutWizard";
import { createWorkoutPlan, generateAIWorkoutPlan } from "../../services/api";

function CreateWorkoutPlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleWizardComplete = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      // Mapear los datos del wizard al formato que espera el backend
      const planRequest = {
        name: `Plan de ${formData.mainGoal} - ${formData.experienceLevel}`,
        description: `Plan personalizado para ${formData.mainGoal}`,
        goal: formData.mainGoal,
        experienceLevel: formData.experienceLevel,
        durationMinutes: Number(formData.sessionDuration),
        daysPerWeek: formData.trainingDays.length,
        trainingDays: formData.trainingDays,
        trainingStyle: formData.trainingStyle,
        trainingPlace: formData.trainingPlace,
        equipment: Array.isArray(formData.equipment) ? formData.equipment : [],
        medicalHistory: formData.medicalHistory || "",
        dislikedExercises: formData.dislikedExercises || "",
        trainingFocus: formData.trainingFocus,
      };

      const shouldUseAI = Boolean(formData.useAI);
      const plan = shouldUseAI
        ? await generateAIWorkoutPlan(planRequest)
        : await createWorkoutPlan(planRequest);

      alert("¡Plan de entrenamiento creado exitosamente! 🎉");

      // Redirigir a la página de workout
      navigate("/workout");
    } catch (err) {
      console.error("Error creando plan:", err);
      setError(
        err.response?.data?.message ||
          "Error al crear el plan de entrenamiento",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/workout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">
            Generando tu plan personalizado...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Esto puede tomar unos segundos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <WorkoutWizard
          onClose={handleClose}
          onComplete={handleWizardComplete}
        />
      </div>
    </div>
  );
}

export default CreateWorkoutPlan;

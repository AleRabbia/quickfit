import { sendWorkoutReminder, sendMealReminder } from './notificationService';

// Guardar recordatorios en localStorage
const STORAGE_KEY = 'quickfit_reminders';

export const saveReminder = (reminder) => {
  const reminders = getReminders();
  reminders.push({
    ...reminder,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  scheduleReminder(reminder);
  return reminders;
};

export const getReminders = () => {
  const reminders = localStorage.getItem(STORAGE_KEY);
  return reminders ? JSON.parse(reminders) : [];
};

export const deleteReminder = (reminderId) => {
  const reminders = getReminders();
  const filtered = reminders.filter(r => r.id !== reminderId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

export const updateReminder = (reminderId, updates) => {
  const reminders = getReminders();
  const updated = reminders.map(r => 
    r.id === reminderId ? { ...r, ...updates } : r
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Programar recordatorio
export const scheduleReminder = (reminder) => {
  const now = new Date();
  const reminderTime = new Date(reminder.date);
  const timeDiff = reminderTime.getTime() - now.getTime();

  if (timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000) { // Solo si es en las próximas 24 horas
    setTimeout(() => {
      if (reminder.type === 'workout') {
        sendWorkoutReminder(reminder.title, reminder.time);
      } else if (reminder.type === 'meal') {
        sendMealReminder(reminder.title, reminder.time);
      }
    }, timeDiff);
  }
};

// Inicializar recordatorios al cargar la app
export const initializeReminders = () => {
  const reminders = getReminders();
  const now = new Date();
  
  // Re-programar recordatorios pendientes
  reminders.forEach(reminder => {
    const reminderTime = new Date(reminder.date);
    if (reminderTime > now) {
      scheduleReminder(reminder);
    }
  });
};

// Crear recordatorios automáticos para el plan de entrenamiento
export const createWorkoutReminders = (workoutPlan) => {
  const reminders = [];
  const today = new Date();
  
  workoutPlan.workoutSessions?.forEach(session => {
    const dayIndex = getDayIndex(session.dayOfWeek);
    const nextOccurrence = getNextDayOccurrence(dayIndex);
    
    // Crear recordatorio 30 minutos antes
    const reminderTime = new Date(nextOccurrence);
    reminderTime.setHours(18, 0, 0, 0); // 6:00 PM por defecto
    reminderTime.setMinutes(reminderTime.getMinutes() - 30);
    
    const reminder = {
      type: 'workout',
      title: session.name,
      description: `Recordatorio para tu entrenamiento: ${session.name}`,
      date: reminderTime.toISOString(),
      time: '18:00',
      workoutSessionId: session.id,
      enabled: true,
    };
    
    reminders.push(reminder);
    saveReminder(reminder);
  });
  
  return reminders;
};

// Crear recordatorios automáticos para el plan nutricional
export const createMealReminders = (mealPlan) => {
  const reminders = [];
  
  mealPlan.meals?.forEach(meal => {
    const today = new Date();
    const mealTime = meal.timeOfDay || '12:00';
    const [hours, minutes] = mealTime.split(':');
    
    const reminderTime = new Date();
    reminderTime.setHours(parseInt(hours), parseInt(minutes) - 15, 0, 0); // 15 min antes
    
    const reminder = {
      type: 'meal',
      title: meal.mealType,
      description: `Recordatorio para tu ${meal.mealType.toLowerCase()}: ${meal.name}`,
      date: reminderTime.toISOString(),
      time: mealTime,
      mealId: meal.id,
      enabled: true,
      recurring: true, // Se repite todos los días
    };
    
    reminders.push(reminder);
    saveReminder(reminder);
  });
  
  return reminders;
};

// Helpers
const getDayIndex = (dayName) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days.indexOf(dayName);
};

const getNextDayOccurrence = (dayIndex) => {
  const today = new Date();
  const currentDay = today.getDay();
  let daysUntil = dayIndex - currentDay;
  
  if (daysUntil <= 0) {
    daysUntil += 7;
  }
  
  const nextOccurrence = new Date(today);
  nextOccurrence.setDate(today.getDate() + daysUntil);
  return nextOccurrence;
};
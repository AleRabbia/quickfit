// Verificar si el navegador soporta notificaciones
export const isNotificationSupported = () => {
  return 'Notification' in window;
};

// Verificar el estado del permiso
export const getNotificationPermission = () => {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  return Notification.permission;
};

// Solicitar permiso para notificaciones
export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    throw new Error('Las notificaciones no están soportadas en este navegador');
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    throw new Error('El permiso para notificaciones fue denegado');
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Enviar notificación
export const sendNotification = (title, options = {}) => {
  if (!isNotificationSupported()) {
    console.warn('Las notificaciones no están soportadas');
    return null;
  }

  if (Notification.permission !== 'granted') {
    console.warn('No hay permiso para enviar notificaciones');
    return null;
  }

  const defaultOptions = {
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    requireInteraction: false,
    ...options,
  };

  const notification = new Notification(title, defaultOptions);

  // Cerrar automáticamente después de 5 segundos
  setTimeout(() => {
    notification.close();
  }, 5000);

  return notification;
};

// Notificación de recordatorio de entrenamiento
export const sendWorkoutReminder = (workoutName, time) => {
  return sendNotification('🏋️ Recordatorio de Entrenamiento', {
    body: `Es hora de tu entrenamiento: ${workoutName}`,
    tag: 'workout-reminder',
    icon: '/workout-icon.png',
  });
};

// Notificación de logro desbloqueado
export const sendAchievementNotification = (achievementName) => {
  return sendNotification('🏆 ¡Nuevo Logro Desbloqueado!', {
    body: achievementName,
    tag: 'achievement',
    icon: '/achievement-icon.png',
  });
};

// Notificación de meta alcanzada
export const sendGoalNotification = (goalDescription) => {
  return sendNotification('🎯 ¡Meta Alcanzada!', {
    body: goalDescription,
    tag: 'goal-reached',
    icon: '/goal-icon.png',
  });
};

// Notificación de recordatorio de comida
export const sendMealReminder = (mealType, time) => {
  return sendNotification('🍽️ Recordatorio de Comida', {
    body: `Es hora de tu ${mealType}`,
    tag: 'meal-reminder',
    icon: '/meal-icon.png',
  });
};
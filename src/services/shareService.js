// Compartir en Twitter
export const shareOnTwitter = (text, url = window.location.href) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=600,height=400');
};

// Compartir en Facebook
export const shareOnFacebook = (url = window.location.href) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=600,height=400');
};

// Compartir en WhatsApp
export const shareOnWhatsApp = (text, url = window.location.href) => {
  const message = `${text} ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

// Compartir en LinkedIn
export const shareOnLinkedIn = (url = window.location.href) => {
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(linkedinUrl, '_blank', 'width=600,height=400');
};

// Compartir vía Web Share API (nativo en móviles)
export const shareNative = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      console.error('Error sharing:', err);
      return false;
    }
  }
  return false;
};

// Copiar al portapapeles
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Error copying to clipboard:', err);
    return false;
  }
};

// Generar imagen de progreso para compartir
export const generateProgressImage = (progressData) => {
  // Aquí se puede implementar la generación de una imagen usando Canvas API
  // Por ahora retornamos un texto formateado
  const { weightChange, days, caloriesBurned } = progressData;
  
  return `🏋️ Mi Progreso en QuickFit 🎯

${weightChange < 0 ? '📉' : '📈'} Peso: ${Math.abs(weightChange)}kg ${weightChange < 0 ? 'perdidos' : 'ganados'}
📅 Días consecutivos: ${days}
🔥 Calorías quemadas: ${caloriesBurned}

¡Únete a QuickFit y transforma tu cuerpo en solo 10-15 minutos al día!`;
};

// Generar mensaje de logro
export const generateAchievementMessage = (achievement) => {
  return `🏆 ¡Logro desbloqueado en QuickFit!

${achievement.title}
${achievement.description}

#QuickFit #Fitness #Logro`;
};
/**
 * Utilitaires de formatage pour l'application
 */

/**
 * Formate une date en anglais au format "Month DD, YYYY"
 * @param {string} dateString - Date au format ISO (YYYY-MM-DD)
 * @returns {string} - Date formatée
 */
export function formatDateEnglish(dateString) {
  if (!dateString) return "";

  const mois = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [year, month, day] = dateString.split("-");
  const monthName = mois[parseInt(month, 10) - 1];

  return `${monthName} ${day}, ${year}`;
}

/**
 * Formate une date selon la locale spécifiée
 * @param {string} dateString - Date au format ISO (YYYY-MM-DD)
 * @param {string} locale - Locale (fr-FR, en-US, es-ES)
 * @returns {string} - Date formatée selon la locale
 */
export function formatDate(dateString, locale = 'fr-FR') {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formate une note en arrondissant à 1 décimale
 * @param {number} note - Note à formater
 * @returns {number} - Note arrondie
 */
export function formatNote(note) {
  return Math.round(note * 10) / 10;
}

/**
 * Formate une durée en minutes vers heures/minutes
 * @param {number} minutes - Durée en minutes
 * @returns {string} - Durée formatée (ex: "2h 15min")
 */
export function formatRuntime(minutes) {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}

/**
 * Génère l'URL d'une image TMDB avec taille spécifiée
 * @param {string} path - Chemin de l'image
 * @param {string} size - Taille (w200, w500, original, etc.)
 * @returns {string} - URL complète de l'image
 */
export function getTMDBImageUrl(path, size = 'w500') {
  if (!path || path === 'null') return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

/**
 * Génère une URL d'image placeholder
 * @param {number} width - Largeur de l'image
 * @param {number} height - Hauteur de l'image
 * @param {string} text - Texte à afficher (optionnel)
 * @returns {string} - URL du placeholder
 */
export function getPlaceholderImage(width, height, text = 'No Image') {
  return `https://placehold.co/${width}x${height}@2x.png?text=${encodeURIComponent(text)}`;
}

/**
 * Obtient le titre d'un média selon son type
 * @param {Object} media - Objet média
 * @param {string} mediaType - Type de média ("movie" ou "tv")
 * @returns {string} - Titre du média
 */
export function getMediaTitle(media, mediaType = "movie") {
  return mediaType === "movie" ? media.title : media.name;
}

/**
 * Obtient la date de sortie d'un média selon son type
 * @param {Object} media - Objet média
 * @param {string} mediaType - Type de média ("movie" ou "tv")
 * @returns {string} - Date de sortie du média
 */
export function getMediaReleaseDate(media, mediaType = "movie") {
  return mediaType === "movie" ? media.release_date : media.first_air_date;
}

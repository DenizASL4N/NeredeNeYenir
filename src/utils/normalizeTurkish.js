// Lowercases with Turkish rules ("İ" -> "i", "I" -> "ı") and strips Turkish
// characters, so "izmir" matches "İzmir" and "cig kofte" matches "Çiğ Köfte".
export const normalizeTurkish = (text) => text.toLocaleLowerCase('tr')
  .replace(/ı/g, 'i')
  .replace(/ö/g, 'o')
  .replace(/ü/g, 'u')
  .replace(/ş/g, 's')
  .replace(/ç/g, 'c')
  .replace(/ğ/g, 'g');

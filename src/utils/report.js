// Errors are reported as GitHub issues on the project repository
export const REPORT_URL = 'https://github.com/DenizASL4N/NeredeNeYenir/issues/new';

// Issue link with the food and city filled in, so the reader only describes the mistake
export const reportUrlFor = (foodName, cityName) => {
  const title = `Hata: ${foodName} (${cityName})`;
  const body = `**Yemek:** ${foodName}\n**İl:** ${cityName}\n\n**Hata nedir?**\n\n**Doğrusu ve kaynağı (varsa):**\n`;
  return `${REPORT_URL}?${new URLSearchParams({ title, body })}`;
};

/**
 * @typedef {Object} Food
 * @property {string} id - Yemeğin benzersiz kimliği (örn: "gaziantep_beyran_corbasi")
 * @property {string} name - Yemeğin adı (örn: "Beyran Çorbası")
 * @property {"Ana Yemek" | "Tatlı"} category - Yemek kategorisi
 * @property {string} image - Yemeğin yüksek çözünürlüklü görsel URL'si
 * @property {string} history - Yemeğin tarihi hikayesi ve açıklaması
 */

/**
 * @typedef {Object} City
 * @property {string} id - Şehrin benzersiz kimliği (örn: "gaziantep")
 * @property {string} name - Şehrin adı (örn: "Gaziantep")
 * @property {string} title - Şehir unvanı / alt başlığı (örn: "Gastronominin Başkenti")
 * @property {string} image - Şehrin kapak görseli URL'si
 * @property {string} description - Şehrin kısa mutfak kültürü tanıtımı
 * @property {Food[]} foods - Şehre ait meşhur yemeklerin listesi
 */

/**
 * @typedef {Object} FavoriteItem
 * @property {string} id - Favoriye eklenen yemeğin ID'si (food.id ile eşleşir)
 * @property {string} name - Yemeğin adı
 * @property {"Ana Yemek" | "Tatlı"} category - Yemek kategorisi
 * @property {string} image - Yemek görseli URL'si
 * @property {string} history - Yemek tarihi hikayesi
 * @property {string} cityName - Yemeğin ait olduğu şehir adı
 * @property {string} notes - Kullanıcının yemek için eklediği kişisel not (CRUD Update konusu)
 * @property {string} addedAt - Favorilere eklenme zamanı (ISO 8601 string)
 */

export const Types = {};

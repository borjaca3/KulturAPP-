// Referencia raíz
var dbRef = firebase.database().ref();

/**
 * Obtener la versión actual del proyecto
 */
async function getVersion() {
  const snapshot = await dbRef.child("Version").get();
  if (!snapshot.exists()) return null;

  // La versión es el último valor del array
  const versionArray = snapshot.val();
  const version = versionArray[versionArray.length - 1];
  console.log("Versión actual:", version);
  return version;
}

/**
 * Obtener las URLs de los videos según la versión actual
 */
async function getVideoURLs() {
  const version = await getVersion();
  if (!version) throw new Error("No se encontró la versión actual");

  const snapshot = await dbRef.child(`VIDEOS/${version}`).get();
  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  // Filtrar solo las claves que empiecen con "URLvideo"
  const urls = Object.keys(data)
    .filter((key) => key.startsWith("URLvideo"))
    .map((key) => data[key]);

  console.log("URLs de videos:", urls);
  return urls;
}

/**
 * Obtener las URLs de los audios según la versión actual
 */
async function getAudioURLs() {
  const version = await getVersion();
  if (!version) throw new Error("No se encontró la versión actual");

  const snapshot = await dbRef.child(`AUDIOS/${version}`).get();
  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  // Filtrar solo las claves que empiecen con "URLaudio"
  const urls = Object.keys(data)
    .filter((key) => key.startsWith("URLaudio"))
    .map((key) => data[key]);

  console.log("URLs de audios:", urls);
  return urls;
}

/**
 * Obtener las imágenes y versión de la tabla P12Imgs
 */
async function getImages() {
  const snapshot = await dbRef.child("P12Imgs").get();
  if (!snapshot.exists()) return {};

  const data = snapshot.val();
  console.log("Imágenes:", data);
  return data;
}

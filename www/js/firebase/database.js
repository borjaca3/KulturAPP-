// Referencia raíz
var dbRef = firebase.database().ref();




async function resgistroUsuario(email, nombre) {
	var tabla = "USUARIO";
	var datosUsuario= {Correo: email, Nombre:nombre};
	var tablaRef = dbRef.child(tabla);
	
	 
			// 1️⃣ Leer los datos actuales
			const snapshot = await tablaRef.once("value");
			const numUsuarios = snapshot.numChildren();
			// 2️⃣ Crear el nuevo ID (ej. ID1, ID2, ID3…)
			const nuevoID = "ID" + (numUsuarios + 1);
			// 3️⃣ Datos del usuario
			// 4️⃣ Guardar en Firebase con la nueva key
			await tablaRef.child(nuevoID).set(datosUsuario);
	
}
async function guardarNombre(nombre,email) {
	var tabla = "USUARIO";
	var datosUsuario= {Correo: email, Nombre:nombre};
	var tablaRef = dbRef.child(tabla);
	
	 
			// 1️⃣ Leer los datos actuales
			const snapshot = await tablaRef.once("value");
			let usuarioEncontrado = null;
			let claveUsuario = null;
		
			// 2️⃣ Buscar el usuario cuyo correo coincida
			snapshot.forEach((childSnapshot) => {
				const datos = childSnapshot.val();
				console.log("Buscando usuario con correo:", email);
				console.log("Datos en Firebase:", snapshot.val());
				if (datos.Correo && datos.Correo.toLowerCase() === email.toLowerCase()) {
					usuarioEncontrado = datos;
					claveUsuario = childSnapshot.key; // Ejemplo: "ID3"
				}
			});
	
		
			// 4️⃣ Actualizar el campo Nombre
			await tablaRef.child(claveUsuario).update({ Nombre: nombre });

}

async function buscarNombre(email) {
	var tabla = "USUARIO";
	var tablaRef = dbRef.child(tabla);
	
			// 1️⃣ Leer los datos actuales
			const snapshot = await tablaRef.once("value");
			let usuarioEncontrado = null;
			let claveUsuario = null;
		
			// 2️⃣ Buscar el usuario cuyo correo coincida
			snapshot.forEach((childSnapshot) => {
				const datos = childSnapshot.val();
				if (datos.Correo && datos.Correo.toLowerCase() === email.toLowerCase()) {
					usuarioEncontrado = datos;
					nombreUsuario = datos.Nombre; 

				}
			});
	
		
			// 4️⃣ Actualizar el campo Nombre
			localStorage.setItem("nombre", nombreUsuario);
}

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
  const urlvideos = Object.keys(data)
    .filter((key) => key.startsWith("URL"))
    .map((key) => data[key]);

  console.log("URLs de videos:", urlvideos);
  return urlvideos;
}

async function asignarVideos() {
  try {
    const urlvideos = await getVideoURLs(); // Espera los links del servidor

    // Asegúrate de que hay suficientes URLs
    if (!urlvideos || urlvideos.length === 0) {
      console.warn("No se encontraron videos.");
      return;
    }

    // Asigna cada URL a un botón según su orden
    const botones = [
      { id: "btn-egipto", index: 3 },
      { id: "btn-francia", index: 4 },
      { id: "btn-eeuu", index: 5 },
      { id: "btn-china", index: 2 },
      { id: "btn-brasil", index: 1 },
      { id: "btn-australia", index: 0 },
    ];

    botones.forEach(({ id, index }) => {
      const boton = document.getElementById(id);
      if (boton && urlvideos[index]) {
        boton.onclick = () => openVideo(urlvideos[index]);
      } else {
        console.warn("No hay URL o botón para ${id}");
      }
    });

    console.log("URLs asignadas correctamente.");
  } catch (error) {
    console.error("Error al asignar los videos:", error);
  }
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
  const urlaudios = Object.keys(data)
    .filter((key) => key.startsWith("URL"))
    .map((key) => data[key]);

  console.log("URLs de audios:", urlaudios);
  return urlaudios;
}

async function asignarAudios() {
  // Espera a que getAudioURLs devuelva las URLs
	try {
    const urls = await getAudioURLs();

    if (!urls || urls.length === 0) {
      console.error("No hay URLs de audios disponibles");
      return;
    }

    // Selecciona los 6 elementos <audio> con id="audio1"... etc
    const audios = Array.from(document.querySelectorAll("audio[id^='audio']"));

    audios.forEach((el, index) => {
      const src = urls[index]; // asigna en el mismo orden que vienen de Firebase
      if (!src) {
        console.warn(`No hay URL para ${el.id} (index ${index})`);
        return;
      }

      el.src = src;
      try { el.load(); } catch (e) {}
      console.log(`Asignado ${src} a ${el.id}`);
    });
  } catch (err) {
    console.error("Error en asignarAudios():", err);
  }
}
// 👇 Escucha un evento personalizado o detecta el cambio de vista
window.addEventListener("hashchange", () => {
  if (window.location.hash === "#page-musica") {
    asignarAudios();
  }
});

// Si la página ya se abre directamente en #page-musica
if (window.location.hash === "#page-musica") {
  window.addEventListener("DOMContentLoaded", asignarAudios);
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

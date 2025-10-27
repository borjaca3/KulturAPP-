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

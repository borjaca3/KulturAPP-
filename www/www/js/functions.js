


//MANDAR CORREO
document.addEventListener("deviceready", function() {

	// Datos de los dibujos
	const dibujos = [
			{
					id: "enviarDibujo1",
					link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449142",
					titulo: "Dibujo 1"
			},
			{
					id: "enviarDibujo2",
					link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449135",
					titulo: "Dibujo 2"
			},
			{
					id: "enviarDibujo3",
					link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449127",
					titulo: "Dibujo 3"
			},
			{
					id: "enviarDibujo4",
					link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449118",
					titulo: "Dibujo 4"
			},
			{
				id: "enviarDibujo5",
				link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449103",
				titulo: "Dibujo 5"
			},
			{
				id: "enviarDibujo6",
				link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449155",
				titulo: "Dibujo 6"
			}

	];

	// Asigna un listener a cada botón existente
	dibujos.forEach(d => {
			const btn = document.getElementById(d.id);
			if (btn) {
					btn.addEventListener("click", function() {

							const email = {
									to: 'bcavia001@ikasle.ehu.eus',
									subject: `${d.titulo} enviado desde KulturApp`,
									body: `
										¡Hola!<br><br>
										Aquí tienes el enlace a  ${d.titulo}:<br>
										<a href="${d.link}">${d.link}</a><br><br>
										😊
										`,
									isHtml: true
							};

							cordova.plugins.email.open(email, function() {
									console.log(`${d.titulo} preparado para enviar`);
							});
					});
			}
	});
});


//VISUALIZAR VIDEOS
function openVideo(url) {
	const modal = document.getElementById("videoModal");
	const iframe = document.getElementById("popupVideo");

	// Si la URL es de YouTube normal, convertirla a formato embed
	if (url.includes("youtube.com/watch?v=")) {
		const videoId = url.split("v=")[1].split("&")[0];
		url = "https://www.youtube.com/embed/" + videoId;
	} 
	else if (url.includes("youtu.be/")) {
		const videoId = url.split("youtu.be/")[1];
		url = "https://www.youtube.com/embed/" + videoId;
	}

	iframe.src = url + "?autoplay=1"; // autoplay al abrir
	modal.style.display = "flex";
}

function closeVideo() {
	const modal = document.getElementById("videoModal");
	const iframe = document.getElementById("popupVideo");
	iframe.src = ""; // Detiene el vídeo
	modal.style.display = "none";
}
///INFORMACION
function openInfo() {
  document.getElementById('infoModal').style.display = 'flex';
}

function closeInfo() {
  document.getElementById('infoModal').style.display = 'none';
}

////REGISTRO DE USUARIO
function clearAuthResults() {
	$("#signResult").empty();
}

async function signin() {
	clearAuthResults();

	var email = $("#email").val();
	var password = $("#password").val();
	var nombre= $("#user-name").val();

	if ((email != null && email != "") && (password != null && password != "")) {
		
		try {
			var authUser = await signin_P(email, password);

			$("#signResult").text("Sesión iniciada con éxito");

			localStorage.setItem("email", email);
			localStorage.setItem("password", password);
			localStorage.setItem("usuarioLogeado",1);
			if(nombre!=null){
				guardarNombre(nombre,email);
				localStorage.setItem("nombre", nombre);
			}else{
				buscarNombre( email)
			}
			$.mobile.changePage("#page-menu");

		}
		catch (error) {
			$("#signResult").text("Error al iniciar la sesión");
			console.error("SIGN IN error: " + "\n\tcode: "+error.code+"\n\tmessage: "+error.message);
		}
	}
	else
	$("#signResult").text("Para iniciar sesión hay que rellenar correo y contraseña");
}

async function signout() {
	clearAuthResults();

	try {
		await signout_P();
		$("#signResult").text("Sesión cerrada con éxito");
		localStorage.removeItem("Usuario Logeado");
		$.mobile.changePage("#page-welcome");
	}
	catch (error) {
		$("#signResult").text("Error al cerrar la sesión");
		console.error("SIGN IN error: " + "\n\tcode: "+error.code+"\n\tmessage: "+error.message);
	}
}
////////////////registro
async function signup() {
	clearAuthResults();

	var email = $("#email").val();
	var password = $("#password").val();
	var nombre= $("#user-name").val();

	if ((email != null && email != "") && (password != null && password != "")&& (nombre != null && nombre != "")) {
		try {
			var newUser = await signup_P(email, password);
			$("#signResult").text("Usuario registrado");
			resgistroUsuario(email, nombre) ;
			localStorage.setItem("nombre", nombre);			
			localStorage.setItem("email", email);
			localStorage.setItem("password", password);
			localStorage.setItem("usuarioLogeado",1);
			$.mobile.changePage("#page-menu");
		}
		catch (error) {
			$("#signResult").text("Problema al crear usuario");
			console.error("SIGN UP error:\n\tcode: " + error.code + "\n\tmessage: " + error.message);
			//alert("Error: " + error.message);
		}
	} else {
		$("#signResult").text("Para iniciar sesión hay que rellenar correo y contraseña");
	}
}



// ===============================
// Mostrar el nombre del usuario en el menú
// ===============================
$(document).on("pageshow", "#page-menu", function() {
  const nombre = localStorage.getItem("nombre");
  const elemento = $("#nombre");

  if (nombre) {
    elemento.text(nombre);
  } else {
    elemento.text("Bienvenido/a, Invitado");
  }
});


///INtento de firebase seguramente hay que eliminar
(async () => {
  const version = await getVersion();
  console.log("Versión actual:", version);

  const videos = await getVideoURLs();
  console.log("Videos:", videos);

  const audios = await getAudioURLs();
  console.log("Audios:", audios);

  const imagenes = await getImages();
  console.log("Imágenes:", imagenes);
})();
//////////
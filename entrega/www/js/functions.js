


//MANDAR CORREO
document.addEventListener("deviceready", function () {

	// Datos de los dibujos
	const dibujos = [
		{
			id: "enviarDibujo1",
			link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449142",
			titulo: "Dibujo E.E.U.U"
		},
		{
			id: "enviarDibujo2",
			link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449135",
			titulo: "Dibujo Francia"
		},
		{
			id: "enviarDibujo3",
			link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449127",
			titulo: "Dibujo Egipto"
		},
		{
			id: "enviarDibujo4",
			link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449118",
			titulo: "Dibujo China"
		},
		{
			id: "enviarDibujo5",
			link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449155",
			titulo: "Dibujo Australia"
		},
		{
			id: "enviarDibujo6",
			link: "https://ehubox.ehu.eus/s/5cSCMF2PQgzbQoY?dir=undefined&path=%2FPinta%20y%20colorea&openfile=245449103",
			titulo: "Dibujo Brasil"
		}

	];

	// Asigna un listener a cada botón existente
	dibujos.forEach(d => {
		const btn = document.getElementById(d.id);
		if (btn) {
			btn.addEventListener("click", function () {

				const email = {
					to: '',
					subject: `${d.titulo} enviado desde KulturApp`,
					body: `
										¡Hola!<br><br>
										Aquí tienes el enlace a  ${d.titulo}:<br>
										<a href="${d.link}">${d.link}</a><br><br>
										😊
										`,
					isHtml: true
				};

				cordova.plugins.email.open(email, function () {
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
	document.getElementById('infoModal').style.display = 'none';
}

////REGISTRO DE USUARIO
function clearAuthResults() {
	$("#signResult").empty();
}

async function signin() {
	clearAuthResults();

	var email = $("#email").val();
	var password = $("#password").val();
	var nombre = $("#user-name").val();

	if ((email != null && email != "") && (password != null && password != "")) {

		try {
			var authUser = await signin_P(email, password);

			$("#signResult").text("Sesión iniciada con éxito");

			localStorage.setItem("email", email);
			localStorage.setItem("usuarioLogeado", 1);
			if (nombre != null) {
				guardarNombre(nombre, email);
				localStorage.setItem("nombre", nombre);
			} else {
				buscarNombre(email)
			}
			$.mobile.changePage("#page-menu");

		}
		catch (error) {
			$("#signResult").text("Error al iniciar la sesión");
			console.error("SIGN IN error: " + "\n\tcode: " + error.code + "\n\tmessage: " + error.message);
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
		localStorage.removeItem("usuarioLogeado");
		$.mobile.changePage("#page-welcome");
	}
	catch (error) {
		$("#signResult").text("Error al cerrar la sesión");
		console.error("SIGN IN error: " + "\n\tcode: " + error.code + "\n\tmessage: " + error.message);
	}
}
////////////////registro
async function signup() {
	clearAuthResults();

	var email = $("#email").val();
	var password = $("#password").val();
	var nombre = $("#user-name").val();

	if ((email != null && email != "") && (password != null && password != "") && (nombre != null && nombre != "")) {
		if (password.length<6) {
			$("#signResult").text("La contraseña es demasiado corta. Debe ser de mínimo 6 caracteres");
		} else {
			try {
				var newUser = await signup_P(email, password);
				$("#signResult").text("Usuario registrado");
				resgistroUsuario(email, nombre);
				localStorage.setItem("nombre", nombre);
				localStorage.setItem("email", email);
				localStorage.setItem("usuarioLogeado", 1);
				$.mobile.changePage("#page-menu");
			}
			catch (error) {
				$("#signResult").text("Problema al crear usuario");
				console.error("SIGN UP error:\n\tcode: " + error.code + "\n\tmessage: " + error.message);
				//alert("Error: " + error.message);
			}

		}
	} else {
		$("#signResult").text("Para iniciar sesión hay que rellenar correo y contraseña");
	}
}



// ===============================
// Mostrar el nombre del usuario en el menú
// ===============================
$(document).on("pageshow", "#page-menu", function () {
	const nombre = localStorage.getItem("nombre");
	const elemento = $("#nombre");

	if (nombre) {
		elemento.text(nombre);
	} else {
		elemento.text("Bienvenido/a, Invitado");
	}
});

const contenedorPlatos = document.getElementById("platos-sobre-mesa");
document.addEventListener("DOMContentLoaded", () => {
	const platos = document.querySelectorAll(".plato");

	// Añadir plato a la mesa


	platos.forEach(plato => {
		plato.addEventListener("click", () => {
			const nombre = plato.dataset.nombre;

			const existente = contenedorPlatos.querySelector(`img[data-nombre="${nombre}"]`);
			if (existente) {
				existente.remove();
				return;
			}

			const nuevoPlato = document.createElement("img");
			nuevoPlato.src = plato.src;
			nuevoPlato.dataset.nombre = nombre;
			nuevoPlato.classList.add("plato-sobre-mesa");

			// Posición aleatoria
			const mesaRect = contenedorPlatos.getBoundingClientRect();
			const x = Math.random() * (mesaRect.width - 70);
			const y = Math.random() * (mesaRect.height - 70);
			nuevoPlato.style.left = `${x}px`;
			nuevoPlato.style.top = `${y}px`;

			nuevoPlato.addEventListener("click", () => nuevoPlato.remove());

			contenedorPlatos.appendChild(nuevoPlato);
		});
	});

});
const btnReiniciar = document.getElementById("btnReiniciar");
const btnFinalizar = document.getElementById("btnFinalizar");

btnReiniciar.addEventListener("click", () => {
	contenedorPlatos.innerHTML = "";
});

btnFinalizar.addEventListener("click", () => {
	alert("¡Has terminado de colocar los platos!");
});




/////////////Aqui estoy haciendo la parte de unir



function newPeerGame() {
	peerGame.create();
	peerGame.print();

	$("#total").empty();
	$("#checkButton").removeClass("ui-disabled").show();
}

function checkRespOnR(rightI) {
	peerGame.clearOnR(rightI);

	var inputValue = $("#resp-" + rightI).val();
	if (inputValue != null && $.isNumeric(inputValue) && (inputValue > 0 && inputValue <= peerGame.items.left.length)) {
		var leftI = inputValue - 1;

		peerGame.clearOnL(leftI);
		peerGame.setNewResp(leftI, rightI);
	}
}

function chooseL(leftI) {
	if (peerGame.chosenL != null)
		peerGame.styleItem("unselect", "#itemL-" + peerGame.chosenL);

	peerGame.clearOnL(leftI);

	peerGame.chosenL = leftI;
	peerGame.styleItem("select", "#itemL-" + leftI, peerGame.items.left[leftI].color);
}

function checkMatchOnR(rightI) {
	var leftI = peerGame.chosenL;

	if (leftI == null) {
		alert("Elige primero la columna de la izquierda");
	}
	else {
		peerGame.clearOnR(rightI);

		peerGame.setNewResp(leftI, rightI);
		peerGame.chosenL = null;
	}
}




function checkRound() {

	var errors = false;

	for (let i in peerGame.checks) {
		if (peerGame.checks[i] == false) {
			peerGame.clearOnR(i);

			errors = true;
		}
	}

	if (errors)
		alert("Sigue intenándolo");
	else {
		$("#gameTable").addClass("ui-disabled");
		alert("¡¡¡¡¡Felicidades!!!!!");

		$("#checkButton").addClass("ui-disabled");
	}
}












/*document.addEventListener("deviceready", function() {
	const sendBtn = document.getElementById("enviarDibujo1");

	if (sendBtn) {
			sendBtn.addEventListener("click", function() {
				var inicailpath= 	"img/Pinta y colorea/eiffel-tower-coloring-page.png";
				
					const email = {
							to: 'bcavia001@ikasle.ehu.eus',
							subject: 'Dibujo 1 enviado desde KulturApp',
							body: 'Aquí tienes mi dibujo 😊',
							attachments: [imagenpath],
							isHtml: true
					};

					cordova.plugins.email.open(email, function() {
							console.log('Correo preparado');
					});
			});
	}
});*/

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



function openVideo(link) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('popupVideo');
  iframe.src = link;
  modal.style.display = 'flex';
}

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('popupVideo');
  modal.style.display = 'none';
  iframe.src = "";
}

function openInfo() {
  document.getElementById('infoModal').style.display = 'flex';
}

function closeInfo() {
  document.getElementById('infoModal').style.display = 'none';
}


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
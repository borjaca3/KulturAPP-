
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	// Cordova is now initialized. Have fun!

	console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

	const usuarioGuardado = localStorage.getItem("usuarioLogeado");

    if (usuarioGuardado==1) {
        console.log("Sesión detectada. Cargando página principal...");
        $.mobile.changePage("#page-menu"); // página principal
    } else {
        console.log("Sin sesión. Redirigiendo a registro...");
        $.mobile.changePage("#page-welcome"); // cambia por el id real de tu página de login
    }

	

}

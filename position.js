/** @type {HTMLElement}*/
var posElt;
/** @type {HTMLElement} */
var posLinkElt;
var viewLat;
var viewLong;


window.addEventListener('load', function(){
    posElt = document.getElementById('Pos');
    posLinkElt = document.querySelector('#PosLink > a');
    viewLat = document.getElementById('lat');
    viewLong = document.getElementById('long');
        navigator.geolocation.getCurrentPosition(geoposOK, geoposKO);
});

/** @param {GeolocationPosition} pos */
function geoposOK(pos) {
    //Obtenemos latitud y longitud
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    //Mostramos la posición
    viewLat.innerText += ` ${lat}`;
    viewLong.innerText += ` ${long}`;
    console.log(`${lat}`);
    console.log(`${long}`);
    //generamos enlace a la posición
    posLinkElt.href = `https://maps.google.com/?q=${lat},${long}`;
    posLinkElt.textContent = 'Mostrar tu posición en un mapa';
}

/** @param {GeolocationPositionError} err */
function geoposKO(err) {
    console.warn(err.message);
    let msg;
    switch(err.code) {
        case err.PERMISSION_DENIED:
            msg = "No nos has dado permiso para obtener tu posición";
            break;
        case err.POSITION_UNAVAILABLE:
            msg = "Tu posición actual no está disponible";
            break;
            case err.TIMEOUT:
                msg = "No se ha podido obtener tu posición en un tiempo prudencial";
                break;
            default:
                msg = "Error desconocido";
                break;
    }
    posElt.textContent = msg;
}

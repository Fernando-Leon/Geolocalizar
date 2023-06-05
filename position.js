var posElt = document.getElementById('Pos');
var posLinkElt = document.querySelector('#PosLink > a');
var viewLat = document.getElementById('lat');
var viewLong = document.getElementById('long');


window.addEventListener('load', function(){
    
    this.setInterval(function(){
        navigator.geolocation.getCurrentPosition(geoposOK, geoposKO);
    }, 500);
});


const geoposOK = (pos) => {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    viewLat.innerText = ` ${lat}`;
    viewLong.innerText = ` ${long}`;
    posLinkElt.href = `https://maps.google.com/?q=${lat},${long}`;
    posLinkElt.textContent = 'Mostrar tu posición en un mapa';
}

const geoposKO = (err) => {
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

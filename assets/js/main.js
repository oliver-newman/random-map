function main() {
    let mapURL = 'https://randommap.herokuapp.com/map';
    fetch(mapURL).then(checkStatus).then(function(response) {
        setImage(response);
        setGoogleMapsURL(response);
    });

    setMenu();
}

function checkStatus(response) {  
    return response.ok ? Promise.resolve(response) :
                         Promise.reject(new Error(response.statusText));
}

function setImage(response) {
    response.blob().then(function(blob) {
        window.URL = window.URL || window.webkitURL;
        let blobURL = window.URL.createObjectURL(blob);
        $('#map').attr('src', blobURL);
    });
}

function setGoogleMapsURL(response) {
    let lat = response.headers.get('Randommap-Latitude') || -58.0371406;
    let lon = response.headers.get('Randommap-Longitude') || -80.6861371;
    let zoom = response.headers.get('Randommap-Zoom') || 7;

    let googleMapsURL = `https://www.google.com/maps/@${lat},${lon},${zoom}z`;
    $('.google-maps-link').attr('href', googleMapsURL);
}

function setMenu() {
    let mouseOverMenu = false;
    let mouseOverIcon = false;

    // Display menu when user hovers over the info icon
    $('.info-button').hover(function() {
        mouseOverIcon = true;
        $('.info-box').slideDown();
    }, function() {
        mouseOverIcon = false;
        setTimeout(function() { // TODO: not the best way to do this
            if (!mouseOverMenu) {
                $('.info-box').slideUp();
            }
        }, 200);
    });

    // Keep menu displayed while the user hovers over it
    $('.info-box').hover(function() {
        mouseOverMenu = true;
    }, function() {
        mouseOverMenu = false;
        if (!mouseOverIcon) {
            $('.info-box').slideUp();
        }
    });
}

$(main());

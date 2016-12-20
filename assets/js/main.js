$(function () {
  const accessToken = ''; // MapBox API token goes here

  // TODO: can't request images larger than 1280x1280
  const w = window.innerWidth,
        h = window.innerHeight
        // Random latitude and longitude
        lat = (Math.random() - 0.5) * 160,
        lon = (Math.random() - 0.5) * 360,
        zoom = 7;

  const googleMapsURL = `https://www.google.com/maps/@${lat},${lon},${zoom}z`,
        imageURL = `https://api.mapbox.com/v4/digitalglobe.nal0g75k/${lon},` +
                  `${lat},${zoom}/${w}x${h}.png?access_token=${accessToken}`;

  $('body').css('background-image', `url(${imageURL})`);
  $('.google-maps-link').attr('href', googleMapsURL);

  let mouseOverMenu = false;
  let mouseOverIcon = false;

  // Display menu when user hovers over the info icon
  $('.info-button').hover(function () {
    mouseOverIcon = true;
    $('.info-box').slideDown();
  }, function () {
    mouseOverIcon = false;
    setTimeout(function () { // TODO: not the best way to do this
      if (!mouseOverMenu) {
        $('.info-box').slideUp();
      }
    }, 200);
  });

  // Keep menu displayed while the user hovers over it
  $('.info-box').hover(function () {
    mouseOverMenu = true;
  }, function () {
    mouseOverMenu = false;
    if (!mouseOverIcon) {
      $('.info-box').slideUp();
    }
  });
});


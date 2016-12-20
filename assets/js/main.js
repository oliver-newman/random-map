$(function () {
  const accessToken = ''; // MapBox API token goes here

  // TODO: can't request images larger than 1280x1280
  const w = window.innerWidth,
        h = window.innerHeight
        // Random latitude and longitude
        lat = (Math.random() - 0.5) * 160,
        lon = (Math.random() - 0.5) * 360,
        zoom = 7;

  const googleMapsURL = `https://www.google.com/maps/@${lat},${lon},${zoom}z`
  const imageURL = `https://api.mapbox.com/v4/digitalglobe.nal0g75k/${lon},` +
                  `${lat},${zoom}/${w}x${h}.png?access_token=${accessToken}`;

  $('body').css('background-image', `url(${imageURL})`);
  $('.google-maps-link').attr('href', googleMapsURL);
});

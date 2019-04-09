function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  }
  else {
    console.log("Geolocation is not supported");
  }
}

function showPosition(position) {
  const guild = $("#guild").val();
  console.log("Latitude:" + position.coords.latitude);
  console.log("Longitude:" + position.coords.longitude);
  console.log(guild);
  $.ajax({
    type: "POST",
    url: '/gps',
    data: {
      guild: guild, 
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude
    }
  });
}

getLocation();
setInterval(getLocation, 60000);
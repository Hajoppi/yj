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
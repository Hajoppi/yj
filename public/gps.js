function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  }
  else {
    console.log("Geolocation is not supported");
  }
}

function showPosition(position) {
  const gc = $("#gc").val();
  console.log("Latitude:" + position.coords.latitude);
  console.log("Longitude:" + position.coords.longitude);
  console.log(gc);
  $.ajax({
    type: "POST",
    url: '/gps',
    data: {
      gc: gc, 
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude
    }
  });
}

getLocation();
setInterval(getLocation, 60000);
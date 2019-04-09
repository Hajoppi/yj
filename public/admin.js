let map;
let markers;
function getLocations() {
  $.ajax({
    type: "GET",
    url: '/gps',
    success: (response) => {
      for(let guild of response) {
        console.log(guild.latitude);
        var lonLat = new OpenLayers.LonLat( guild.longitude, guild.latitude)
          .transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()
        );
        markers.addMarker(new OpenLayers.Marker(lonLat));
        console.log(markers);
      }
    }
  });
}
$(() => {
  $(".date").each( (index, obj) => {
    console.log($(obj).text());
    const d = new Date($(obj).text());
    $(obj).text(d.toLocaleTimeString("it-IT"));
  });

  map = new OpenLayers.Map("mapdiv");
  map.addLayer(new OpenLayers.Layer.OSM());
  var lonLat = new OpenLayers.LonLat( 24.8275665, 60.190480099999995)
    .transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()
  );
  var lonLat2 = new OpenLayers.LonLat( 24.7275665, 60.190480099999995)
  .transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()
);
  const zoom = 15;
  markers = new OpenLayers.Layer.Markers("Markers");
  map.addLayer(markers);
  map.zoomToMaxExtent();
  getLocations();
});
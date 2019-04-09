$(() => {
  $(".date").each( (index, obj) => {
    console.log($(obj).text());
    const d = new Date($(obj).text());
    $(obj).text(d.toLocaleTimeString("it-IT"));
  });

  const map = new OpenLayers.Map("mapdiv");
  map.addLayer(new OpenLayers.Layer.OSM());
  var lonLat = new OpenLayers.LonLat( 24.8275665, 60.190480099999995)
    .transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()
  );
  var lonLat2 = new OpenLayers.LonLat( 24.7275665, 60.190480099999995)
  .transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()
);
  const zoom = 15;
  const markers = new OpenLayers.Layer.Markers("Markers");
  map.addLayer(markers);
  markers.addMarker(new OpenLayers.Marker(lonLat));
  markers.addMarker(new OpenLayers.Marker(lonLat2));
  map.setCenter(lonLat, zoom);
});
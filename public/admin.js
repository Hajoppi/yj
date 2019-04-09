$(() => {
  $(".date").each( (index, obj) => {
    console.log($(obj).text());
    const d = new Date($(obj).text());
    $(obj).text(d.toLocaleTimeString("it-IT"));
  });

  const map = new OpenLayers.Map("demoMap");
  map.addLayer(new OpenLayers.Layer.OSM());
  var lonLat = new OpenLayers.LonLat(60.190480099999995, 24.8275665)
    .transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()
  );
  const zoom = 16;
  const markers = new OpenLayers.Layer.Markers("Markers");
  map.addLayer(markers);
  markers.addMarker(new OpenLayers.Marker(lonLat));
  map.setCenter(lonLat, zoom);
});
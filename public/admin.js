
let map;
let vectorSource;

function getLocations() {
  $.ajax({
    type: "GET",
    url: '/gps',
    success: (response) => {
      vectorSource.clear();
      const markers = [];
      for(let guild of response) {
        const longitude = Number(guild.longitude)
        const latitude = Number(guild.latitude)
        var marker = new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([longitude, latitude])
          )
        });
        marker.setStyle(new ol.style.Style({
          image: new ol.style.Icon({
            src: 'static/guilds/'+ guild.guild + '.png',
            scale: 0.2
          })
        }));
        markers.push(marker);
      }
      vectorSource.addFeatures(markers);
    }
  });
}
$(() => {
  $(".date").each( (index, obj) => {
    console.log($(obj).text());
    const d = new Date($(obj).text());
    $(obj).text(d.toLocaleTimeString("it-IT"));
  });

  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([24.9425683, 60.1674086]),
      zoom: 10
    })
  });
  vectorSource = new ol.source.Vector({
    features: []
  });
  var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });
  map.addLayer(markerVectorLayer);
  getLocations();
});
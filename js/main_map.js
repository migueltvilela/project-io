function main() {
  var map = new L.Map('map', {
    zoomControl: false,
    center: [-62.1, -58.3],
    zoom: 10
  });


  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }).addTo(map);

  cartodb.createLayer(map, 'https://migueltvilela.cartodb.com/api/v2/viz/1af50e86-77a7-11e5-babd-0e674067d321/viz.json')
      .addTo(map)
   .on('done', function(layer) {
    layer.setInteraction(true);
    /*layer.on('featureOver', function(e, latlng, pos, data) {
      cartodb.log.log(e, latlng, pos, data);
    });
    layer.on('error', function(err) {
      cartodb.log.log('error: ' + err);
    });
  }).on('error', function() {
    cartodb.log.log("some error occurred");*/
  });
}
// you could use $(window).load(main);
window.onload = main;
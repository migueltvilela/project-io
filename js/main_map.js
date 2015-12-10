var Maps = (function(){
  console.log('filter();')
  var module = {};

  module.activeFilters = [];
  module.inactiveFilters = [];
  module.widthScreen = window.innerWidth;

  module.init = function(){
    module.drawMap();
    module.checkActiveFilters();

    function update() {
        $("#tooltip").hide();
    }

    module.map.on("moveend", update);
    update();

  } 

  module.createFilter = function(data){
    //create div with filters
    var valsFilters = [],
        filters = ['subject', 'microorganism','type_of_sample_habitat'];

     data.forEach(function(d) {
      var nameSubject = d.properties['subject'],
          nameMicroorganism = d.properties['microorganism'],
          nameHabitat = d.properties['type_of_sample_habitat'];

      filters.forEach(function(e) {
        if(d.properties[e].indexOf('/')<0){
          if(valsFilters.indexOf(d.properties[e].toLowerCase()) < 0){
            valsFilters.push(d.properties[e].toLowerCase());
            $('#filter-'+e).find('ul').append('<li><a href="#" class="filter">'+d.properties[e]+'<i class="fa fa-check" data-status="active" id="'+d.properties[e]+'"></i></a></li>')
          }
        }
        else{
          var splitVals = d.properties[e].split('/');
          for(v in splitVals){
            if(valsFilters.indexOf(splitVals[v].toLowerCase()) < 0){
              valsFilters.push(splitVals[v].toLowerCase());
              $('#filter-'+e).find('ul').append('<li><a href="#" class="filter">'+splitVals[v]+'<i class="fa fa-check" data-status="active" id="'+splitVals[v]+'"></i></a></li>')
            }
          }
        }
      })

    })
    module.filterEvents(data);
  }

  module.drawMap = function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGVobWlyYW5kYWMyIiwiYSI6ImNpaHRncDNocjAxOTd1MW0xcmpwcnl2MzMifQ.brpwWKmPZbAa0pAXSMA1ow';
    module.map = L.mapbox.map('map', 'dehmirandac2.ocfpo5eo')
      .setView([-63.85, -57.77], 6);

    var sql_statement = 'SELECT * FROM database_io_revisado_290915_vmapa WHERE the_geom IS NOT NULL',
        sql = new cartodb.SQL({ user: 'migueltvilela', format: 'geojson', dp: 5}),
        data;

    sql.execute(sql_statement, {table_name: 'database_io_revisado_290915_vmapa'})
      .done(function(collection) {
          data = collection.features
         module.drawCircles(data);
         module.createFilter(data);
    })
  }

  module.drawCircles = function(data){
    var circle_options = {
      color: '#fff',      // Stroke color
      opacity: 1,         // Stroke opacity
      weight: 5,         // Stroke weight
      fillColor: 'orange',  // Fill color
      fillOpacity: 1   // Fill opacity
    }

    $('.leaflet-zoom-animated').find('g').remove();
     data.forEach(function(d) {
      if(!d.hide){
        module.map.addLayer(L.circle([d.geometry.coordinates[1], d.geometry.coordinates[0]], 700, circle_options))
      }
     });

    //click on markee
      $('.leaflet-clickable').on('click', function(e){
        console.log('click')
        var index = $(this).parent().index();
        var lengthTooltip = $('#tooltip').find('p').length;
        for(i=0; i<lengthTooltip; ++i){
          var idValue = $('#tooltip').find('p').eq(i).attr('id'),
              text = data[index].properties[idValue];

          $('#tooltip').find('p').eq(i).text(text);
         }
         $('#tooltip').css("left", (event.x)+"px").css("top", (event.y) + "px").show();
      })
  }

  module.checkActiveFilters = function(){
    var length = $('.inside-submenu1 li').length,
      i = 0;
    for(i; i<length; ++i){
      var id = $('.filter').eq(i).attr('id');
      module.activeFilters.push(id)
    }
  }

  module.filterEvents = function(data){
    $('.filter').on('click', function(e) {
      e.preventDefault();
       var filterName = $(this).text().toLowerCase(),
           nameAttr = $(this).parents('.filters').attr('id').split('-')[1],
            id = $(this).find('i').attr("id"),
            status = $(this).find('i').data('status'),
            indexFilter = module.activeFilters.indexOf(id);

       if(status == "active"){
        $(this).find('i').attr('class', 'filter fa fa-times').data('status', 'inactive');

        module.activeFilters.splice(indexFilter, 1);
        module.inactiveFilters.push(id);

       } else{
        $(this).find('i').attr('class', 'filter fa fa-check').data('status', 'active');

        module.inactiveFilters.splice(indexFilter, 1);
        module.activeFilters.push(id);
       }

       data.forEach(function(e) {
        var value = e.properties[nameAttr].toLowerCase();
        if(value.indexOf(filterName)<0 && status == "active"){
          e.hide = true;
        }else if(value.indexOf(filterName)<0 && status == "inactive"){
          e.hide = false;
        }
       })
       module.drawCircles(data);

     });

  }

  return module.init;
})();

Maps()
var Maps = (function(){
  var module = {};

  module.activeFilters = {
                              subject:[],
                              microorganism: [],
                              type_of_sample_habitat: []};
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

      d.hide = false;

      filters.forEach(function(e) {
        if(d.properties[e].indexOf('/')<0){
          if(valsFilters.indexOf(d.properties[e].toLowerCase()) < 0){
            valsFilters.push(d.properties[e].toLowerCase());
            $('#filter-'+e).find('ul').append('<li><a href="#" class="filter">'+d.properties[e]+'<div class="checkbox"><i class="fa" data-status="inactive" id="'+d.properties[e]+'"></i></div></a></li>')
          }
        }
        else{
          var splitVals = d.properties[e].split('/');
          for(v in splitVals){
            if(valsFilters.indexOf(splitVals[v].toLowerCase()) < 0){
              valsFilters.push(splitVals[v].toLowerCase());
              $('#filter-'+e).find('ul').append('<li><a href="#" class="filter">'+splitVals[v]+'<div class="checkbox"><i class="fa" data-status="inactive" id="'+splitVals[v]+'"></i></div></a></li>')
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
      .setView([-62.10, -58.27], 9);

    var sql_statement = 'SELECT * FROM database_io_revisado_151215_vmapa WHERE the_geom IS NOT NULL',
        sql = new cartodb.SQL({ user: 'migueltvilela', format: 'geojson', dp: 5}),
        data;

    sql.execute(sql_statement, {table_name: 'database_io_revisado_151215_vmapa'})
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
      weight: 1,         // Stroke weight
      fillColor: '#b11b00',  // Fill color
      fillOpacity: 1   // Fill opacity
    }

    $('.leaflet-zoom-animated').find('g').remove();
     data.forEach(function(d) {
      if(!d.hide){
        module.map.addLayer(L.circle([d.geometry.coordinates[1], d.geometry.coordinates[0]], 700, circle_options))
      }
     });

     /*$('.leaflet-zoom-animated').on('click',function(e) {
        // Force the popup closed.
        //e.layer.closePopup();

        //var feature = e.layer.feature;
        var info = document.getElementById('tooltip');
        var content = '<div><strong>' + 'oi' + '</strong>' +
                      '<p>' + 'tchau' + '</p></div>';

        info.innerHTML = content;
    });*/

     /*module.map.addLayer
     $('.leaflet-zoom-animated').append('<div id="tooltip" class="hidden">'+
        '<p id="title"></p>'+
        '<p id="subject"></p>'+
        '<p id="microorganism"></p>'+
        '<p id="type_of_sample_habitat"></p>'+
        '<a href="" id="paper_link">Link para paper</a>'+
      '</div>')*/

    //click on markee
      $('.leaflet-clickable').on('click', function(e){
        var index = $(this).parent().index();
        var lengthTooltip = $('#tooltip').children().length;
        for(i=0; i<lengthTooltip; ++i){
          var idValue = $('#tooltip').children().eq(i).attr('id'),
              text = data[index].properties[idValue];
          console.log(idValue)
          if(idValue == "paper_link"){
            console.log(text)
            $('#tooltip').children().eq(i).attr('href', text);
          }
          else{
            $('#tooltip').children().eq(i).text(text);
          }
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
            indexFilter = module.activeFilters[nameAttr].indexOf(id);

       if(status == "active"){
        $(this).find('i').attr('class', 'filter').data('status', 'inactive');

         module.activeFilters[nameAttr].splice(indexFilter, 1);

       } else{
        $(this).find('i').attr('class', 'filter fa fa-check').data('status', 'active');

        module.activeFilters[nameAttr].push(id);
       }

       data.forEach(function(e) {
        $.each(module.activeFilters, function(index, value) {
            e.hide = true;
            for(i in value){
              var myVal = e.properties[index].toLowerCase(),
                  name = value[i].toLowerCase();
              //console.log(myVal)
              //console.log(name)
              //console.log(myVal.indexOf(name))
              //console.log("")
              if(myVal.indexOf(name)>=0){
                e.hide = false;
                return false
              }
              else{
                e.hide = true;
              }
              //console.log(myVal.indexOf(val))
            }
        }); 
       })

       module.drawCircles(data);

     });

  }

  return module.init;
})();

Maps()
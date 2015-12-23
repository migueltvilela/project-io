var Filters = (function(){
	console.log('filter();')
	var module = {};

	module.activeFilters = [];
	//module.inactiveFilters = [];
	module.widthScreen = window.innerWidth;

	module.init = function(){
		/*module.checkActiveFilters();*/
		module.submenuOpen();
		module.submenuFilter();
		module.otherFilters();
	}	

	/*module.checkActiveFilters = function(){
		var length = $('.inside-submenu1 li').length,
			i = 0;
		for(i; i<length; ++i){
			var id = $('.filter').eq(i).attr('id');
			module.activeFilters.push(id)
		}
	}*/

	module.submenuOpen = function(){
		$(".submenu1 li").on("mouseenter", function(){
			if(module.widthScreen > 994){
				$(this).find(".inside-submenu1").fadeIn("fast");
			}
		})
		$(".submenu1 li").on("mouseleave", function(){
			if(module.widthScreen > 994){
				$(this).find(".inside-submenu1").fadeOut("fast");
			}
		})
	}

	module.otherFilters = function(){
		$('#filter-others').on('click', function(e) {
			e.preventDefault();
			var status = $(this).find('i').data('status');

			if(status == "active"){
				$(this).find('i').attr('class', 'filter fa fa-times').data('status', 'inactive');
			}else{
				$(this).find('i').attr('class', 'filter fa fa-check').data('status', 'active');
			}
		});
	}

	module.submenuFilter = function(){
		$(".filter").on("click", function(e){
			e.preventDefault();

			var id = $(this).find('i').attr("id"),
				status = $(this).find('i').data('status'),
				indexFilter = module.activeFilters.indexOf(id);

			 if(status == "active"){
			 	$(this).find('i').attr('class', 'filter').data('status', 'inactive');

			 	//module.inactiveFilters.splice(indexFilter, 1);
			 	module.activeFilters.splice(indexFilter, 1);

			 } else{
			 	$(this).find('i').attr('class', 'filter fa fa-check').data('status', 'active');

			 	module.activeFilters.push(id);
			 	//module.inactiveFilters.push(id);
			 }

			 module.hideFiltered();

			 console.log(module.activeFilters)
			 //console.log(module.inactiveFilters)
		})
	}

	module.hideFiltered = function(){
		$('.float-indexes').show();
		for(i in module.activeFilters){
			$('.float-indexes').hide();
			$('.filter-'+module.activeFilters[i]).parents('.float-indexes').show();
		}
	}

	return module.init;
})();

Filters()
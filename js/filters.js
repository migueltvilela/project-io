var Filters = (function(){
	var module = {};

	module.activeFilters = [];
	module.inactiveFilters = [];

	module.init = function(){
		module.checkActiveFilters();
		module.submenuOpen();
		module.submenuFilter();
	}	

	module.checkActiveFilters = function(){
		var length = $('.inside-submenu1 li').length,
			i = 0;
		for(i; i<length; ++i){
			var id = $('.filter').eq(i).attr('id');
			module.activeFilters.push(id)
		}
	}

	module.submenuOpen = function(){
		$(".submenu1 li").on("mouseenter", function(){
			$(this).find(".inside-submenu1").fadeIn("fast");
		})
		$(".submenu1 li").on("mouseleave", function(){
			$(this).find(".inside-submenu1").fadeOut("fast");
		})
	}

	module.submenuFilter = function(){
		$(".filter").on("click", function(e){
			e.preventDefault();

			var id = $(this).attr("id"),
				status = $(this).data('status'),
				indexFilter = module.activeFilters.indexOf(id);

			 if(status == "active"){
			 	$(this).attr('class', 'filter fa fa-times');
			 	$(this).data('status', 'inactive');

			 	module.activeFilters.splice(indexFilter, 1);
			 	module.inactiveFilters.push(id);

			 } else{
			 	$(this).attr('class', 'filter fa fa-check');
			 	$(this).data('status', 'active');

			 	module.inactiveFilters.splice(indexFilter, 1);
			 	module.activeFilters.push(id);
			 }

			 module.hideFiltered();
		})
	}

	module.hideFiltered = function(){
		$('.float-indexes').show();
		for(i in module.inactiveFilters){
			$('.filter-'+module.inactiveFilters[i]).parents('.float-indexes').hide();
		}
	}

	return module.init;
})();

Filters()
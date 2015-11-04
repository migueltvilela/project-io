
var Commons = (function(){
	var module = {};
	
	module.init = function(){
		$('#btn-small-menu').on('click', function(e) {
			e.preventDefault();
			module.smallMenu($(this));
		});

		$('.btn-submenu-small').on('click', function(e) {
			e.preventDefault();
			module.submenuSmallMenu($(this));
		});
	};

	module.smallMenu = function(me){
		var isVisible = me.siblings('ul').is(':visible');
		isVisible ? me.siblings('ul').fadeOut('fast') : me.siblings('ul').fadeIn('fast');
	};

	module.submenuSmallMenu = function(me){
		var isVisible = $('.submenu1').is(':visible');
		if(isVisible){
			$('.submenu1').fadeOut('fast');
			$('.btn-submenu-small').addClass('closed-submenu');
		}
		else{
			$('.submenu1').fadeIn('fast');
			$('.btn-submenu-small').removeClass('closed-submenu');
		}
	}
	
	return module.init;

})();

Commons()
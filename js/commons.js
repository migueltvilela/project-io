
var Commons = (function(){
	var module = {};
	
	module.init = function(){
		$('#btn-small-menu').on('click', function(e) {
			e.preventDefault();
			module.smallMenu($(this));
		});

		$('.btn-submenu-small').on('click', function(e) {
			e.preventDefault();
			module.submenuSmallMenu($(this), $('.submenu1'),'closed-submenu');
		});

		$('.btn-sidebar-small').on('click', function(e) {
			e.preventDefault();
			module.submenuSmallMenu($(this), $('.sidebar-content'));
		});
	};

	module.smallMenu = function(me){
		var isVisible = me.siblings('ul').is(':visible');
		isVisible ? me.siblings('ul').fadeOut('fast') : me.siblings('ul').fadeIn('fast');
	};

	module.submenuSmallMenu = function(me, divContent, myClass){
		var isVisible = divContent.is(':visible');
		if(isVisible){
			divContent.fadeOut('fast');
			me.addClass(myClass);
		}
		else{
			divContent.fadeIn('fast');
			me.removeClass(myClass);
		}
	}
	
	return module.init;

})();

Commons()
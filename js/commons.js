
var Commons = (function(){
	var module = {};
	
	module.init = function(){
		$('#btn-small-menu').on('click', function(e) {
			e.preventDefault();
			module.smallMenu($(this));
		});
	};

	module.smallMenu = function(me){
		var isVisible = me.siblings('ul').is(':visible');
		isVisible ? me.siblings('ul').fadeOut('fast') : me.siblings('ul').fadeIn('fast');
	}
	
	return module.init;

})();

Commons()
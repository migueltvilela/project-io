var Slider = (function(){
	var module = {};

	module.count = 0;

	module.total = $('.hold-images').length;

	module.init = function(){
		module.clickButton();
		$('.controls .total').text(module.total)
	}	

	module.clickButton = function(){
		$('.controls').find('a').on('click', function(e){
			e.preventDefault();
			var typeButton = $(this).attr('class');
			typeButton == "next" ? module.nextPhoto() : module.previousPhoto();
		})
	}

	module.nextPhoto = function(){
		if(module.count == (module.total - 1)){
			return false;
		}
		else{
			module.count ++;
			$('.hold-images').hide();
			$('#img'+module.count).fadeIn('fast');
			$('.controls .current').text(module.count+1);
		}
	}

	module.previousPhoto = function(){
		if(module.count == 0){
			return false;
		}
		else{
			module.count --;
			$('.hold-images').hide();
			$('#img'+module.count).fadeIn('fast');
			$('.controls .current').text(module.count+1);
		}
	}

	return module.init;
})();

Slider()
var WAR = (function( $ ){

	var started = false;
	var colorToMove = undefined;

	var end = (function(){

		alert('the war has ended.. someone won');

	});

	return {
		
		started: started,
		colorToMove: colorToMove,
		end: function(){

			end();
		
		}

	};

})( jQuery );
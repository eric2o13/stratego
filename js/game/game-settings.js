var WAR = (function( $ ){

	var started = false;
	var colorToMove = undefined;
	//var movelist = new Array();

	//zorgen dat er een movelist wordt bijgehouden,
	// moet er ongeveer als volgt uitzien:
	// [rank -> field id] // als hij beweegt
	// [rank x fieldid ] (als je een stuk slaat)
	// [rank <- rank] //attacking piece dies
	// [rank -- rank ] both pieces die
	// [rank !! F ]

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
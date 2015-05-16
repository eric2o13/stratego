var ARRANGE_ARMY = (function( $ ){

	var calculateAvailableOptions = function( $element ){

		$element.addClass("selected");

	};

	$("#battlefield .field figure").on("click", function(event){

		calculateAvailableOptions( $(this) );

	});

})( jQuery );
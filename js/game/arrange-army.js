var ARRANGE_ARMY = (function( $ , Battlefield ){ //alleen uitvoeren als er geen WAR is..

	var checkAvailableOptions = function( $element ){

		var Options = [],
			$field 	= $element.parents(".field"),
			fieldid = $field.attr("data-fieldid"),
			field 	= BOARD.selectFieldById(fieldid),
			piece 	= field.occupiedBy,
			color 	= piece.color;

		console.log(field);
		console.log(piece);

		for ( var y = 0; y < 12; y++ ) {
			for ( var x = 0; x < 12; x++ ) {
				if (Battlefield[y][x].occupied) {
					if (Battlefield[y][x].occupiedBy.color == color) {
						if (Battlefield[y][x].id != fieldid) {
								Options.push(Battlefield[y][x].id);
						}
					}
				}
			}
		}

		console.log(Options);

		$element.addClass("selected");

	};



	var bindClickEvents = function(){

		$("#battlefield .field figure").on("click", function(event){

			checkAvailableOptions( $(this) );

		});

	};

	$(document).on("ready", function(){

		if ( !WAR.started ) bindClickEvents();

	});


})( jQuery, BOARD.canvas );
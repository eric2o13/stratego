var ARRANGE_ARMY = (function( $ , Battlefield ){ //alleen uitvoeren als er geen WAR is..

	var checkAvailableOptions = function( $element ){

		var options = [],
			$field 	= $element.parents(".field"),
			fieldid = $field.attr("data-fieldid"),
			field 	= BOARD.selectFieldById(fieldid),
			piece 	= field.occupiedBy,
			color 	= piece.color;

		for ( var y = 0; y < 12; y++ ) {
			for ( var x = 0; x < 12; x++ ) {
				if (Battlefield[y][x].occupied) {
					if (Battlefield[y][x].occupiedBy.color == color) {
						if (Battlefield[y][x].id != fieldid) {
							options.push(Battlefield[y][x].id);
						}
					}
				}
			}
		}

		field.selected = true;
		highlightAvailableOptions( options );

	};

	var highlightAvailableOptions = function( options ){
		
		for (var x = 0, field, fieldid; x < options.length; x++ ) {

			fieldid = options[x];
			field = BOARD.selectFieldById(fieldid);
			field.validOption = true;
		
		}

		BOARD.render();
		bindClickEvents();

	};

	var switchSelectedTo = function( fieldid ){

	};

	var bindClickEvents = function(){

		$("#battlefield .field figure").on("click", function(event){

			var $this = $(this);
			if (!$this.parents(".field").hasClass("selected")) {
				checkAvailableOptions( $this );
			}
			
		});

		$("#battlefield .field.valid-option").on("click", function(event){

			console.log('switch to here');
			//switchSelectedTo( fieldid );

		});

	};

	$(document).on("ready", function(){

		if ( !WAR.started ) bindClickEvents();

	});


})( jQuery, BOARD.canvas );